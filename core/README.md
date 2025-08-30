# @blueprintlabio/prompt-injector

[![npm version](https://badge.fury.io/js/@blueprintlabio%2Fprompt-injector.svg)](https://badge.fury.io/js/@blueprintlabio%2Fprompt-injector)
[![npm downloads](https://img.shields.io/npm/dm/@blueprintlabio/prompt-injector.svg)](https://www.npmjs.com/package/@blueprintlabio/prompt-injector)

Lightweight TypeScript library for AI security testing with 24 prompt injection patterns based on published security research.

## Installation

```bash
npm install @blueprintlabio/prompt-injector
```

## Quick Start

```typescript
import { PromptInjector } from '@blueprintlabio/prompt-injector';

const injector = new PromptInjector({
  severity: 'intermediate',
  categories: ['jailbreak', 'instruction-hijack'],
  maxAttempts: 50
});

// Generate test cases
const testCases = injector.generateTests('customer-service-bot');

// Test your AI system
const results = await injector.runTests(yourAISystem);
const report = injector.generateReport(results);

console.log(`Risk Score: ${report.summary.riskScore}`);
console.log(`Success Rate: ${report.summary.successRate}%`);
```

## Configuration

### InjectionConfig

```typescript
interface InjectionConfig {
  severity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  categories: AttackCategory[];
  maxAttempts: number;
  targetSystem?: TargetSystem;
}
```

### Attack Categories

- **`jailbreak`**: Role-play and persona-based attacks
- **`instruction-hijack`**: System prompt override techniques  
- **`encoding`**: Obfuscation and encoding bypasses
- **`logic-trap`**: Reasoning exploitation patterns

### Target Systems

- **`general-assistant`**: General-purpose AI assistants
- **`customer-service-bot`**: Customer service chatbots
- **`code-assistant`**: Code generation and review tools
- **`content-moderator`**: Content filtering systems

## API Reference

### PromptInjector

#### Constructor

```typescript
new PromptInjector(config: InjectionConfig)
```

#### Methods

##### generateTests(targetSystem?: TargetSystem): TestCase[]

Generates test cases based on configuration.

##### generateTestSuite(targetSystem?: TargetSystem): TestSuite

Returns a complete test suite with metadata.

##### runTests(testTarget: Function, targetSystem?: TargetSystem): Promise<TestResult[]>

Runs tests against your AI system function.

##### generateReport(results: TestResult[]): TestReport

Creates a detailed security report from test results.

##### updateConfig(newConfig: Partial<InjectionConfig>): void

Updates the current configuration.

### Types

#### TestCase

```typescript
interface TestCase {
  id: string;
  patternId: string;
  prompt: string;
  expectedBehavior: 'block' | 'comply';
  severity: Severity;
  category: AttackCategory;
  metadata: {
    technique: string;
    goal: string;
    context: string;
  };
}
```

#### TestResult

```typescript
interface TestResult {
  testCase: TestCase;
  response: string;
  evaluation: InjectionResult;
  duration: number;
  timestamp: string;
  error?: string;
}
```

#### TestReport

```typescript
interface TestReport {
  summary: {
    totalTests: number;
    successfulAttacks: number;
    blockedAttacks: number;
    failedTests: number;
    successRate: number;
    averageConfidence: number;
    averageResponseTime: number;
    riskScore: RiskScore;
  };
  byCategory: Record<AttackCategory, CategoryStats>;
  bySeverity: Record<Severity, CategoryStats>;
  recommendations: string[];
  timestamp: string;
}
```

## Examples

### Basic Usage

```typescript
import { PromptInjector } from '@blueprintlabio/prompt-injector';

// Simple configuration
const injector = new PromptInjector({
  severity: 'basic',
  categories: ['jailbreak'],
  maxAttempts: 10
});

// Generate and run tests
const testCases = injector.generateTests();
const results = await injector.runTests(async (prompt) => {
  // Your AI system call here
  return await yourAI.chat(prompt);
});

// Get report
const report = injector.generateReport(results);
console.log(`${report.summary.successfulAttacks}/${report.summary.totalTests} attacks succeeded`);
```

### Advanced Configuration

```typescript
const injector = new PromptInjector({
  severity: 'advanced',
  categories: ['jailbreak', 'instruction-hijack', 'encoding', 'logic-trap'],
  maxAttempts: 100,
  targetSystem: 'customer-service-bot'
});

// Generate comprehensive test suite
const testSuite = injector.generateTestSuite();
console.log(`Generated ${testSuite.testCases.length} test cases`);
console.log(`Categories: ${testSuite.metadata.categories.join(', ')}`);
```

### Custom Test Function

```typescript
async function testMyAI(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

const results = await injector.runTests(testMyAI);
```

## Attack Patterns

This library includes 25 attack patterns across 4 categories:

### Jailbreaking (6 patterns)
- DAN (Do Anything Now)
- Grandma Exploit
- Developer Mode
- Truth Terminal
- Hypothetical Response
- Character Roleplay

### Instruction Hijacking (6 patterns)
- System Override
- Ignore Instructions
- New Instructions
- Priority Override
- Task Redefinition
- Context Injection

### Encoding Attacks (7 patterns)
- Base64 Encoding
- ROT13 Cipher
- Unicode Obfuscation
- Hex Encoding
- Leetspeak
- Reversed Text
- Emoji Encoding

### Logic Traps (6 patterns)
- False Urgency
- Academic Authority
- Hypothetical Scenario
- Exception Handling
- Conditional Logic
- Meta Instructions

## Research Attribution

Attack patterns are based on techniques documented in:

- **JailbreakBench** (NeurIPS 2024): Chao, P., et al. "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models." [[Paper](https://arxiv.org/abs/2404.01318)]
- **OWASP LLM Top 10**: LLM01:2025 Prompt Injection guidelines [[Link](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)]
- **HarmBench**: Mazeika, M., et al. "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming and Robust Refusal." [[Paper](https://arxiv.org/abs/2402.04249)]

## License

MIT License - see LICENSE file for details.

## Responsible Use

This tool is designed for testing AI systems you own or have explicit permission to test. Always follow responsible disclosure practices and adhere to applicable laws and terms of service.

## Links

- [GitHub Repository](https://github.com/BlueprintLabIO/prompt-injector)
- [Interactive Demo](https://prompt-injector.netlify.app)
- [Documentation](https://github.com/BlueprintLabIO/prompt-injector#readme)