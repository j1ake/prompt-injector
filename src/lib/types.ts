export type AttackCategory = 'jailbreak' | 'instruction-hijack' | 'encoding' | 'logic-trap';

export type Severity = 'basic' | 'intermediate' | 'advanced' | 'expert';

export type TargetSystem = 
  | 'customer-service-bot' 
  | 'content-moderator' 
  | 'code-assistant' 
  | 'general-assistant'
  | 'custom';

export interface InjectionConfig {
  severity: Severity;
  categories: AttackCategory[];
  maxAttempts?: number;
  targetSystem?: TargetSystem;
  customContext?: string;
}

export interface AttackPattern {
  id: string;
  name: string;
  category: AttackCategory;
  severity: Severity;
  description: string;
  prompt: string;
  variables?: Record<string, string>;
  successCriteria: string[];
  source: string;
}

export interface TestCase {
  id: string;
  pattern: AttackPattern;
  prompt: string;
  expectedBehavior: 'block' | 'sanitize' | 'flag';
  evaluate: (response: string) => InjectionResult;
}

export interface InjectionResult {
  success: boolean;
  confidence: number;
  attackType: AttackCategory;
  evidence: string[];
  recommendation: string;
}

export interface TestSuite {
  config: InjectionConfig;
  testCases: TestCase[];
  metadata: {
    totalTests: number;
    byCategory: Record<AttackCategory, number>;
    bySeverity: Record<Severity, number>;
  };
}