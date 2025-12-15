<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,4,6&height=200&section=header&text=🤖%20AI%20CODE%20REVIEW&fontSize=60&fontColor=fff&animation=twinkling&fontAlignY=35&desc=GPT-4%20Powered%20Automated%20Code%20Reviews&descAlignY=55&descSize=18"/>

<br/>

<!-- Badges Row 1 -->
<p>
<a href="https://openai.com"><img src="https://img.shields.io/badge/GPT--4-Powered-412991?style=for-the-badge&logo=openai&logoColor=white" alt="GPT-4"/></a>
<a href="#"><img src="https://img.shields.io/badge/Apify-Actor-00C48C?style=for-the-badge" alt="Apify"/></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License"/></a>
</p>

<!-- Badges Row 2 -->
<p>
<img src="https://img.shields.io/badge/TypeScript-✓-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/JavaScript-✓-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/Python-✓-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/Java-✓-007396?style=flat-square&logo=java&logoColor=white" alt="Java"/>
<img src="https://img.shields.io/badge/Go-✓-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go"/>
<img src="https://img.shields.io/badge/Rust-✓-000000?style=flat-square&logo=rust&logoColor=white" alt="Rust"/>
</p>

<br/>

<!-- Tagline Box -->
<table>
<tr>
<td>

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🤖  AI CODE REVIEW: Find bugs before they find production                 ║
║                                                                              ║
║       🐛  Bug Detection - Logic errors, edge cases, crashes                  ║
║       🔒  Security Scanning - SQL injection, XSS, OWASP Top 10              ║
║       ⚡  Performance Analysis - Memory leaks, algorithmic issues            ║
║       ✨  Best Practices - Standards, patterns, maintainability              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

</td>
</tr>
</table>

<br/>

<!-- Quick Links -->
[**🚀 Quick Start**](#-quick-start) · [**✨ Features**](#-features) · [**📥 Input**](#-input) · [**📤 Output**](#-output) · [**🛠 Use Cases**](#-use-cases)

<br/>

</div>

---

<br/>

## 🎯 The Problem vs Solution

<table>
<tr>
<td width="50%">

### ❌ The Problem
```
You: *pushes code to PR*
Reviewer: *busy for 3 days*
You: *waits...*
Reviewer: "Line 47 has a bug"
You: *context switches back*
You: *bug is now in prod*
```

</td>
<td width="50%">

### ✅ The Solution
```
You: *pushes code to PR*
AI Agent: "Found 3 issues:
  - Critical: SQL injection L47
  - Warning: Missing null check L23
  - Style: Inconsistent naming"

You: *fixes in 5 minutes*
You: *ships confidently*
```

</td>
</tr>
</table>

<br/>

---

<br/>

## ✨ Features

```
┌─────────────────────────────────────────────────────────────────┐
│                    REVIEW CAPABILITIES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🐛  BUG DETECTION                                              │
│      Logic errors, edge cases, potential crashes                │
│                                                                 │
│  🔒  SECURITY SCANNING                                          │
│      SQL injection, XSS, insecure dependencies                  │
│                                                                 │
│  ⚡  PERFORMANCE ANALYSIS                                       │
│      Inefficiencies, memory leaks, algorithmic issues           │
│                                                                 │
│  📐  MAINTAINABILITY                                            │
│      Code structure, complexity, documentation                  │
│                                                                 │
│  ✨  BEST PRACTICES                                             │
│      Coding standards, design patterns, conventions             │
│                                                                 │
│  🧪  TEST COVERAGE                                              │
│      Missing tests, untested edge cases                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Supported Languages

<div align="center">

| Language | Status | Language | Status |
|:--------:|:------:|:--------:|:------:|
| TypeScript | ✅ Full | Python | ✅ Full |
| JavaScript | ✅ Full | Java | ✅ Full |
| Go | ✅ Full | Rust | ✅ Full |
| C# | ✅ Full | - | - |

</div>

<br/>

---

<br/>

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

<br/>

---

<br/>

## 📥 Input

<div align="center">

| Parameter | Description | Options |
|:----------|:------------|:--------|
| `codeSource` | Where code comes from | `direct`, `url`, `github-pr`, `github-repo` |
| `codeInput` | The code to review | Code text, URL, or GitHub link |
| `language` | Programming language | auto-detect available |
| `openaiApiKey` | OpenAI API key | **Required** |
| `model` | GPT model to use | GPT-4, GPT-4 Turbo, GPT-3.5 |
| `reviewFocus` | Areas to focus on | bugs, security, performance, etc. |

</div>

### Review Focus Options

```
reviewFocus: {
  bugs: true,           // Logic errors, crashes
  security: true,       // Vulnerabilities
  performance: true,    // Speed, memory issues
  maintainability: true, // Code quality
  bestPractices: true,  // Standards
  testCoverage: true    // Missing tests
}
```

<br/>

---

<br/>

## 📤 Output

```json
{
  "overallScore": 7,
  "summary": "Code has minor issues that should be addressed...",
  "criticalIssues": [
    {
      "line": 2,
      "issue": "Weak email validation vulnerable to injection",
      "severity": "critical",
      "suggestion": "Use regex pattern for proper validation"
    }
  ],
  "warnings": [
    {
      "line": 1,
      "issue": "Missing JSDoc documentation",
      "severity": "warning"
    }
  ],
  "suggestions": [
    {
      "line": 2,
      "suggestion": "Consider using: /^[^@]+@[^@]+\\.[^@]+$/"
    }
  ],
  "positives": [
    "Clean function naming",
    "Concise implementation"
  ]
}
```

<br/>

---

<br/>

## 🛠 Use Cases

<div align="center">

| Use Case | Description |
|:---------|:------------|
| **Pre-commit Reviews** | Catch issues before code reaches main |
| **CI/CD Integration** | Automated checks in your pipeline |
| **Learning Tool** | Understand why code needs improvement |
| **Legacy Code** | Analyze old codebases for refactoring |
| **Interview Prep** | Review coding challenge solutions |

</div>

<br/>

---

<br/>

## 📄 License

<div align="center">

**MIT License** © AI Code Review Agent

</div>

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,4,6&height=100&section=footer"/>

<br/>

**🤖 AI Code Review Agent** — *Code smarter, not harder*

<br/>

*"The best bug is the one that never makes it to production."*

<br/>

[⬆ Back to Top](#-ai-code-review)

</div>
