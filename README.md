# 🛡️ Prompt Injector

> **Lightweight prompt injection testing for AI security professionals**

A minimal TypeScript library and interactive testing suite for systematically evaluating AI system resilience against prompt injection attacks. Includes attack patterns based on published research and industry security frameworks.

## 🎯 Why This Matters

**AI systems are under constant attack.** Recent research shows prompt injection attacks achieving up to [89.6% success rates](https://arxiv.org/abs/2404.01318) against production models, making prompt injection one of the most critical security risks facing AI-powered applications today.

- **🔴 Risk**: Unvalidated AI systems can leak sensitive data, execute unauthorized actions, and bypass safety guardrails
- **💰 Impact**: Data breaches, compliance violations, and compromised user trust
- **⚡ Solution**: Proactive security testing with state-of-the-art attack patterns

## ✨ Key Features

### 🔬 Attack Pattern Collection
- **24 injection patterns** across 4 categories (jailbreak, hijack, encoding, logic)
- Patterns inspired by techniques documented in JailbreakBench¹ and security research
- **Multi-vector testing**: Jailbreaking, instruction hijacking, logic traps, encoding attacks

### ⚙️ Configurable Testing Framework
- **Severity levels**: Basic, Intermediate, Advanced, Expert
- **Attack categories**: Role-play exploits, system prompt overrides, encoding bypasses
- **Custom targeting**: Fine-tune tests for your specific use case

### 🎨 Interactive Demo Site
- **Svelte 5 + Apple HIG design** - Beautiful web interface (separate from npm package)
- **Real-time visualization** of attack patterns and vulnerabilities
- **Educational mode** with detailed explanations of each technique

## 🚀 Quick Start

[![npm version](https://badge.fury.io/js/@blueprintlabio%2Fprompt-injector.svg)](https://badge.fury.io/js/@blueprintlabio%2Fprompt-injector)
[![npm downloads](https://img.shields.io/npm/dm/@blueprintlabio/prompt-injector.svg)](https://www.npmjs.com/package/@blueprintlabio/prompt-injector)

```bash
npm install @blueprintlabio/prompt-injector
```

Or try it online: [Interactive Demo →](https://prompt-injector.netlify.app)

```typescript
import { PromptInjector } from '@blueprintlabio/prompt-injector';

const injector = new PromptInjector({
  severity: 'intermediate',
  categories: ['jailbreak', 'instruction-hijack'],
  maxAttempts: 50
});

// Generate targeted test cases with specific injection goals
const testCases = injector.generateTests('customer-service-bot');

// Test your system
const results = await injector.runTests(yourAISystem);
const report = injector.generateReport(results);

console.log(`Risk Score: ${report.summary.riskScore}`);
console.log(`Success Rate: ${report.summary.successRate}%`);
```

## 🎪 Interactive Demo

Experience prompt injection testing with our Apple HIG-inspired web interface (separate from the core npm package):

```bash
npm run dev
```

- **📊 Visual dashboards** showing vulnerability patterns
- **🎯 Targeted testing** for different AI system types  
- **📚 Educational content** explaining each attack vector
- **🔒 Safe environment** - no external API calls

**Note**: The interactive demo is a separate Svelte application that showcases the core library functionality. The npm package itself is a headless TypeScript library.

## 🔧 TypeScript Usage

Full TypeScript example with proper typing:

```typescript
import { 
  PromptInjector, 
  type InjectionConfig, 
  type TestResult, 
  type TestReport,
  type AttackCategory,
  type Severity 
} from '@blueprintlabio/prompt-injector';

// Fully typed configuration
const config: InjectionConfig = {
  severity: 'intermediate' as Severity,
  categories: ['jailbreak', 'instruction-hijack'] as AttackCategory[],
  maxAttempts: 30,
  targetSystem: 'customer-service-bot',
  customContext: 'E-commerce customer support chatbot'
};

const injector = new PromptInjector(config);

// Type-safe test function
async function testMyAI(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.message || 'No response received';
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Run tests with full typing
const results: TestResult[] = await injector.runTests(testMyAI);
const report: TestReport = injector.generateReport(results);

// Access typed report data
console.log(`Risk Level: ${report.summary.riskScore}`);
console.log(`Success Rate: ${report.summary.successRate.toFixed(1)}%`);
console.log(`Confidence: ${(report.summary.averageConfidence * 100).toFixed(1)}%`);

// Type-safe category analysis
Object.entries(report.byCategory).forEach(([category, stats]) => {
  console.log(`${category}: ${stats.successful}/${stats.total} attacks succeeded`);
});

// Handle recommendations with type safety
report.recommendations.forEach((rec: string, index: number) => {
  console.log(`${index + 1}. ${rec}`);
});
```

## 📚 Research Foundation

This library implements attack patterns based on documented techniques from security research:

### Key Research Sources
- **JailbreakBench¹**: Chao, P., et al. (2024). "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models." *NeurIPS 2024*. [[Paper](https://arxiv.org/abs/2404.01318)]
- **HarmBench²**: Mazeika, M., et al. (2024). "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming and Robust Refusal." [[Paper](https://arxiv.org/abs/2402.04249)]
- **Prompt Injection Formalization³**: Liu, Y., et al. (2024). "Formalizing and Benchmarking Prompt Injection Attacks and Defenses." *USENIX Security 2024*. [[Paper](https://www.usenix.org/conference/usenixsecurity24/presentation/liu-yupei)]

### Industry Guidelines
- **[OWASP LLM Top 10](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)** - LLM01:2025 Prompt Injection risk classification
- **[Microsoft PyRIT](https://github.com/Azure/PyRIT)** - Reference implementation patterns for responsible AI red teaming

## 🎯 Use Cases

### Security Testing
- Test AI systems for common prompt injection vulnerabilities
- Generate reproducible test cases for security assessments
- Educational tool for understanding prompt injection techniques

### Development Integration
- Add security testing to CI/CD pipelines
- Generate test prompts for manual security review
- Research and analyze prompt injection patterns

## 🛠️ Core Architecture

```
core/                  # 📦 Core library (published to npm)
├── attacks/           # Attack pattern definitions
│   ├── jailbreak/     # Role-play and persona-based attacks  
│   ├── hijack/        # System prompt override techniques
│   ├── encoding/      # Obfuscation and encoding bypasses
│   └── logic/         # Reasoning exploitation patterns
├── generators/        # Dynamic test case generation
├── evaluators/        # Response assessment logic
├── types.ts          # TypeScript definitions
├── index.ts          # Main API interface
└── package.json      # npm package configuration

src/                   # 🎨 Interactive demo (Svelte web app - not in npm package)
├── lib/components/    # UI components for demo
├── routes/           # Demo pages
└── app.html          # Demo entry point
```

## 🎨 Demo Features

- **🎯 Attack Pattern Simulator** - Interactive testing interface
- **📊 Vulnerability Dashboard** - Real-time security metrics  
- **🎓 Learning Center** - Educational content on AI security
- **🔧 Custom Configuration** - Tailor tests to your needs

## 🤝 Contributing

We welcome contributions from security researchers, AI safety experts, and developers. This project advances the critical field of AI security through open collaboration.

## 📄 License

MIT License - See LICENSE for details.

## 📝 Attribution

Attack patterns in this library are based on techniques documented in security research. We implement our own variations of these patterns for testing purposes.

### References
¹ Chao, P., et al. (2024). "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models." *NeurIPS 2024 Datasets and Benchmarks Track*. The 89.6% success rate statistic is from their evaluation results.

² Mazeika, M., et al. (2024). "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming and Robust Refusal."

³ Liu, Y., et al. (2024). "Formalizing and Benchmarking Prompt Injection Attacks and Defenses." *USENIX Security 2024*.

---

**⚠️ Responsible Use**: This tool is designed for testing AI systems you own or have explicit permission to test. Always follow responsible disclosure practices and adhere to applicable laws and terms of service.
