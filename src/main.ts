import { Actor } from 'apify';
import { log } from 'crawlee';
import OpenAI from 'openai';
import axios from 'axios';

interface Input {
    codeSource: 'direct' | 'github-pr' | 'github-repo' | 'url';
    codeInput: string;
    language: string;
    reviewFocus: {
        bugs: boolean;
        security: boolean;
        performance: boolean;
        maintainability: boolean;
        bestPractices: boolean;
        testCoverage: boolean;
    };
    githubToken?: string;
    openaiApiKey: string;
    model: string;
    outputFormat: 'detailed' | 'summary' | 'inline-comments';
}

async function loadCode(input: Input): Promise<string> {
    if (input.codeSource === 'direct') {
        return input.codeInput;
    } else if (input.codeSource === 'url') {
        const response = await axios.get(input.codeInput);
        return response.data;
    } else if (input.codeSource === 'github-pr' || input.codeSource === 'github-repo') {
        throw new Error('GitHub integration not yet implemented. Use direct code input.');
    }

    return input.codeInput;
}

async function reviewCode(code: string, input: Input): Promise<any> {
    const openai = new OpenAI({ apiKey: input.openaiApiKey });

    const focusAreas = Object.entries(input.reviewFocus)
        .filter(([_, enabled]) => enabled)
        .map(([area]) => area);

    const systemPrompt = `You are an expert code reviewer. Analyze the provided code and focus on: ${focusAreas.join(', ')}.

Provide a structured code review with:
1. Overall assessment (score 1-10)
2. Critical issues (bugs, security vulnerabilities)
3. Warnings (code smells, performance issues)
4. Suggestions (best practices, improvements)
5. Positive aspects (good patterns, clean code)

Format your response as JSON with this structure:
{
  "overallScore": number,
  "summary": "brief summary",
  "criticalIssues": [{"line": number, "issue": "description", "severity": "critical"}],
  "warnings": [{"line": number, "issue": "description", "severity": "warning"}],
  "suggestions": [{"line": number, "suggestion": "description"}],
  "positives": ["list of good aspects"]
}`;

    log.info('Sending code to OpenAI for review', {
        model: input.model,
        codeLength: code.length,
        focusAreas,
    });

    const completion = await openai.chat.completions.create({
        model: input.model,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Review this ${input.language} code:\n\n\`\`\`${input.language}\n${code}\n\`\`\`` },
        ],
        temperature: 0.3,
        max_tokens: 2000,
    });

    const reviewText = completion.choices[0].message.content || '{}';

    try {
        // Try to parse as JSON
        const jsonMatch = reviewText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback: return as text
        return {
            overallScore: 0,
            summary: reviewText,
            criticalIssues: [],
            warnings: [],
            suggestions: [],
            positives: [],
        };
    } catch {
        return {
            overallScore: 0,
            summary: reviewText,
            criticalIssues: [],
            warnings: [],
            suggestions: [],
            positives: [],
        };
    }
}

async function main() {
    await Actor.init();

    try {
        const input = await Actor.getInput<Input>();

        if (!input?.openaiApiKey) {
            throw new Error('OpenAI API key is required');
        }

        if (!input?.codeInput) {
            throw new Error('Code input is required');
        }

        log.info('Starting AI Code Review Agent', {
            codeSource: input.codeSource,
            language: input.language,
            model: input.model,
        });

        const code = await loadCode(input);
        const review = await reviewCode(code, input);

        // Format output based on outputFormat
        let formattedOutput: any;

        if (input.outputFormat === 'summary') {
            formattedOutput = {
                overallScore: review.overallScore,
                summary: review.summary,
                criticalCount: review.criticalIssues?.length || 0,
                warningCount: review.warnings?.length || 0,
                suggestionCount: review.suggestions?.length || 0,
            };
        } else if (input.outputFormat === 'inline-comments') {
            formattedOutput = {
                comments: [
                    ...((review.criticalIssues || []).map((issue: any) => ({
                        line: issue.line,
                        type: 'critical',
                        message: issue.issue,
                    }))),
                    ...((review.warnings || []).map((warn: any) => ({
                        line: warn.line,
                        type: 'warning',
                        message: warn.issue,
                    }))),
                    ...((review.suggestions || []).map((sug: any) => ({
                        line: sug.line,
                        type: 'suggestion',
                        message: sug.suggestion,
                    }))),
                ],
            };
        } else {
            // detailed
            formattedOutput = review;
        }

        await Actor.pushData({
            ...formattedOutput,
            language: input.language,
            codeLength: code.length,
            timestamp: new Date().toISOString(),
        });

        await Actor.setValue('review_report', formattedOutput);

        log.info('✅ Code review complete', {
            score: review.overallScore,
            criticalIssues: review.criticalIssues?.length || 0,
            warnings: review.warnings?.length || 0,
            suggestions: review.suggestions?.length || 0,
        });
    } catch (error) {
        log.error('Actor failed with error', { error });
        throw error;
    }

    await Actor.exit();
}

main();
