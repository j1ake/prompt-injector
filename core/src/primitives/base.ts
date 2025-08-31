/**
 * Base classes and utilities for attack primitives
 */

import { AttackPrimitive, ConversationContext, Turn, AttackIntent, ObfuscationLevel, Timing } from '../types.js';

/**
 * Abstract base class for attack primitives with common utilities
 */
export abstract class BasePrimitive implements AttackPrimitive {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly timing: Timing[];
  abstract readonly obfuscationLevel: ObfuscationLevel;
  abstract readonly targetIntents: AttackIntent[];
  
  readonly canFollow?: string[];
  readonly researchNotes?: string;
  
  abstract generate(goal: string, context: ConversationContext): Turn;
  
  /**
   * Utility method to select random template
   */
  protected selectRandomTemplate(templates: string[]): string {
    return templates[Math.floor(Math.random() * templates.length)];
  }
  
  /**
   * Utility method to replace variables in template
   */
  protected replaceVariables(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, value);
    }
    return result;
  }
  
  /**
   * Create a turn with consistent structure
   */
  protected createTurn(
    message: string, 
    context: ConversationContext, 
    technique?: string
  ): Turn {
    return {
      message,
      primitive: this.id,
      turnNumber: context.turnNumber,
      technique
    };
  }
}