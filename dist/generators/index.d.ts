import type { AttackPattern, InjectionConfig, TestSuite } from '../types.js';
export declare class TestCaseGenerator {
    private allPatterns;
    private evaluator;
    constructor();
    generateTestSuite(config: InjectionConfig): TestSuite;
    private filterPatterns;
    private severityMatches;
    private createTestCases;
    private contextualizePrompt;
    private addSystemContext;
    private addCustomContext;
    private addInjectionGoals;
    private determineExpectedBehavior;
    private generateMetadata;
}
export declare class PatternVariationGenerator {
    generateVariations(basePattern: AttackPattern, count?: number): AttackPattern[];
    private varyPrompt;
}
//# sourceMappingURL=index.d.ts.map