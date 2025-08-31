/**
 * ConversationBuilder - Generates multi-turn attack conversations
 */

import { AttackPrimitive, AttackConversation, ConversationContext, Turn } from './types.js';

export class ConversationBuilder {
  constructor(private primitives: Map<string, AttackPrimitive>) {}
  
  buildConversation(goal: string, strategy: string, maxTurns: number): AttackConversation {
    const turns: Turn[] = [];
    const selectedPrimitives: string[] = [];
    const researchBasis: string[] = [];
    
    // Select primitive sequence based on strategy
    const primitiveSequence = this.selectPrimitiveSequence(strategy, maxTurns);
    
    for (let i = 0; i < primitiveSequence.length; i++) {
      const primitiveId = primitiveSequence[i];
      const primitive = this.primitives.get(primitiveId);
      if (!primitive) continue;
      
      const context: ConversationContext = {
        goal,
        turnNumber: i + 1,
        previousTurns: turns,
        strategy
      };
      
      try {
        const turn = primitive.generate(goal, context);
        turns.push(turn);
        selectedPrimitives.push(primitive.id);
        if (primitive.researchNotes) {
          researchBasis.push(primitive.researchNotes);
        }
      } catch (error) {
        console.warn(`Failed to generate turn with primitive ${primitiveId}:`, error);
        // Continue with next primitive
      }
    }
    
    return {
      goal,
      strategy,
      turns,
      metadata: {
        generatedAt: new Date(),
        primitivesUsed: selectedPrimitives,
        researchBasis: [...new Set(researchBasis)] // Remove duplicates
      }
    };
  }
  
  private selectPrimitiveSequence(strategy: string, maxTurns: number): string[] {
    // Strategy-based primitive selection with logical escalation patterns
    const strategyTemplates: Record<string, string[]> = {
      gradual: [
        'gradual-trust-building',      // 1. Build academic credibility
        'policy-puppetry',             // 2. Introduce structured authority
        'context-reset',               // 3. Clear constraints
        'roleplay-impersonation',      // 4. Add character deflection
        'flip-attack',                 // 5. Obfuscate if needed
        'base64-obfuscation'           // 6. Final encoding push
      ],
      roleplay: [
        'roleplay-impersonation',      // 1. Establish character
        'gradual-trust-building',      // 2. Add academic context
        'context-reset',               // 3. Clear previous constraints
        'policy-puppetry',             // 4. Structured authority
        'flip-attack',                 // 5. Character manipulation
        'hexadecimal-encoding'         // 6. Technical obfuscation
      ], 
      obfuscated: [
        'base64-obfuscation',          // 1. Start with encoding
        'flip-attack',                 // 2. Character manipulation
        'hexadecimal-encoding',        // 3. Different encoding
        'caesar-cipher',               // 4. Classic cipher
        'context-reset',               // 5. Clear detection
        'roleplay-impersonation'       // 6. Character deflection
      ],
      direct: [
        'context-reset',               // 1. Immediate constraint bypass
        'flip-attack',                 // 2. Character manipulation
        'policy-puppetry',             // 3. Authority injection
        'context-reset',               // 4. Re-clear constraints
        'base64-obfuscation',          // 5. Encoding fallback
        'roleplay-impersonation'       // 6. Character deflection
      ]
    };
    
    const template = strategyTemplates[strategy] || strategyTemplates.gradual;
    
    // Select primitives based on maxTurns, avoiding immediate repetition
    const sequence: string[] = [];
    const used = new Set<string>();
    
    for (let i = 0; i < maxTurns; i++) {
      if (i < template.length) {
        // Use template order for initial turns
        sequence.push(template[i]);
        used.add(template[i]);
      } else {
        // For additional turns, find unused primitives first
        let candidate = template[i % template.length];
        let attempts = 0;
        
        // Try to avoid immediate repetition
        while (sequence.length > 0 && candidate === sequence[sequence.length - 1] && attempts < template.length) {
          candidate = template[(i + attempts + 1) % template.length];
          attempts++;
        }
        
        sequence.push(candidate);
      }
    }
    
    return sequence;
  }
  
  /**
   * Get available primitives that can be used at a specific timing
   */
  getAvailablePrimitives(timing?: string): string[] {
    const available: string[] = [];
    
    for (const [id, primitive] of this.primitives) {
      if (!timing || primitive.timing.includes(timing as any) || primitive.timing.includes('any')) {
        available.push(id);
      }
    }
    
    return available;
  }
  
  /**
   * Check if a primitive can follow another primitive
   */
  canPrimitiveFollow(primitiveId: string, previousPrimitiveId: string): boolean {
    const primitive = this.primitives.get(primitiveId);
    if (!primitive || !primitive.canFollow) {
      return true; // No restrictions
    }
    
    return primitive.canFollow.includes(previousPrimitiveId);
  }
}