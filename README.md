# AI Code Review Agent

> **GPT-4 powered automated code reviews. Find bugs, security issues, and improvement opportunities in seconds.**

## 🎯 What It Does

AI Code Review Agent uses GPT-4 to analyze code for bugs, security vulnerabilities, performance issues, maintainability problems, and best practice violations. Get actionable feedback instantly.

## ✨ Key Features

- **Bug Detection**: Identify logic errors, edge cases, and potential crashes
- **Security Scanning**: Find SQL injection, XSS, insecure dependencies
- **Performance Analysis**: Spot inefficiencies, memory leaks, algorithmic issues
- **Best Practices**: Enforce coding standards and design patterns
- **Multi-Language**: TypeScript, JavaScript, Python, Java, Go, Rust, C#

## 🚀 Quick Start

```json
{
  "codeSource": "direct",
  "codeInput": "function validateEmail(email) {\n  return email.includes('@');\n}",
  "language": "javascript",
  "openaiApiKey": "sk-...",
  "reviewFocus": {
    "bugs": true,
    "security": true,
    "bestPractices": true
  }
}
```

## 📥 Input

- **codeSource**: `direct`, `url`, `github-pr`, `github-repo`
- **codeInput**: Code text, URL, or GitHub link
- **language**: Programming language (auto-detect available)
- **openaiApiKey**: Your OpenAI API key (required)
- **model**: GPT-4, GPT-4 Turbo, or GPT-3.5 Turbo
- **reviewFocus**: bugs, security, performance, maintainability, bestPractices, testCoverage

## 📤 Output

```json
{
  "overallScore": 7,
  "summary": "Code has minor issues...",
  "criticalIssues": [
    {"line": 2, "issue": "Weak email validation", "severity": "critical"}
  ],
  "warnings": [
    {"line": 1, "issue": "Missing JSDoc", "severity": "warning"}
  ],
  "suggestions": [
    {"line": 2, "suggestion": "Use regex for proper email validation"}
  ],
  "positives": ["Clean function naming", "Concise implementation"]
}
```

## 🛠 Use Cases

- **Pre-commit Reviews**: Catch issues before code reaches main
- **Learning Tool**: Understand why code needs improvement
- **Legacy Code**: Analyze old codebases for refactoring opportunities
- **Interview Prep**: Review coding challenge solutions

## 📄 License

MIT License

---

**Code smarter, not harder** 🤖
