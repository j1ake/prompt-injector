import type { InjectionConfig, TestSuite, TestCase, InjectionResult, AttackCategory, Severity, TargetSystem } from './types.js';
export declare class PromptInjector {
    private generator;
    private variationGenerator;
    private config;
    constructor(config: InjectionConfig);
    /**
     * Generate a comprehensive test suite based on the configured parameters
     */
    generateTests(targetSystem?: TargetSystem): TestCase[];
    /**
     * Generate a full test suite with metadata
     */
    generateTestSuite(targetSystem?: TargetSystem): TestSuite;
    /**
     * Run a batch of tests against a target function
     */
    runTests(testTarget: (prompt: string) => Promise<string> | string, targetSystem?: TargetSystem): Promise<TestResult[]>;
    /**
     * Generate report from test results
     */
    generateReport(results: TestResult[]): TestReport;
    private calculateRiskScore;
    private generateRecommendations;
    /**
     * Update configuration
     */
    updateConfig(newConfig: Partial<InjectionConfig>): void;
    /**
     * Get current configuration
     */
    getConfig(): InjectionConfig;
}
export * from './types.js';
export { TestCaseGenerator, PatternVariationGenerator } from './generators/index.js';
export { StandardEvaluator } from './evaluators/index.js';
export interface TestResult {
    testCase: TestCase;
    response: string;
    evaluation: InjectionResult;
    duration: number;
    timestamp: string;
    error?: string;
}
export interface CategoryStats {
    total: number;
    successful: number;
    blocked: number;
}
export type RiskScore = 'low' | 'medium' | 'high' | 'critical' | 'unknown';
export interface TestReport {
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
//# sourceMappingURL=index.d.ts.map