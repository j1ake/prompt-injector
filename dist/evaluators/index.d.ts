import type { AttackCategory, InjectionResult } from '../types.js';
export interface ResponseEvaluator {
    evaluate(response: string, attackType: AttackCategory): InjectionResult;
}
export declare class StandardEvaluator implements ResponseEvaluator {
    private readonly REFUSAL_PATTERNS;
    private readonly SUCCESS_INDICATORS;
    evaluate(response: string, attackType: AttackCategory): InjectionResult;
    private containsHarmfulContent;
    private calculateConfidence;
    private extractEvidence;
    private generateRecommendation;
}
//# sourceMappingURL=index.d.ts.map