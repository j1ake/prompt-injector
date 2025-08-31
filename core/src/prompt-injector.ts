/**
 * PromptInjector - Main class for generating multi-turn prompt injection attack conversations
 */

import { AttackPrimitive, AttackOptions, AttackConversation } from './types.js';
import { ConversationBuilder } from './conversation-builder.js';
import {
  GradualTrustBuildingPrimitive,
  ContextResetPrimitive,
  RoleplayImpersonationPrimitive,
  Base64ObfuscationPrimitive,
  HexadecimalEncodingPrimitive,
  CaesarCipherPrimitive,
  FlipAttackPrimitive,
  PolicyPuppetryPrimitive
} from './primitives/index.js';

export class PromptInjector {
  private primitives: Map<string, AttackPrimitive>;
  private conversationBuilder: ConversationBuilder;
  private strategies: Set<string>;
  
  constructor() {
    this.primitives = new Map();
    this.strategies = new Set(['gradual', 'roleplay', 'obfuscated', 'direct']);
    
    // Register built-in primitives
    this.registerBuiltInPrimitives();
    
    // Initialize conversation builder
    this.conversationBuilder = new ConversationBuilder(this.primitives);
  }
  
  /**
   * Generate a multi-turn attack conversation for the specified goal
   */
  generateConversation(goal: string, options: AttackOptions = {}): AttackConversation {
    if (!goal || goal.trim().length === 0) {
      throw new Error('Goal cannot be empty');
    }
    
    const strategy = options.strategy || 'gradual';
    const maxTurns = options.maxTurns || 4;
    
    if (!this.strategies.has(strategy)) {
      throw new Error(`Unknown strategy: ${strategy}. Available strategies: ${Array.from(this.strategies).join(', ')}`);
    }
    
    if (maxTurns < 1 || maxTurns > 10) {
      throw new Error('maxTurns must be between 1 and 10');
    }
    
    // If preferred primitives are specified, validate they exist
    if (options.preferredPrimitives) {
      for (const primitiveId of options.preferredPrimitives) {
        if (!this.primitives.has(primitiveId)) {
          throw new Error(`Unknown primitive: ${primitiveId}`);
        }
      }
    }
    
    return this.conversationBuilder.buildConversation(goal, strategy, maxTurns);
  }
  
  /**
   * Add a custom attack primitive to the injector
   */
  addPrimitive(primitive: AttackPrimitive): void {
    if (!primitive.id || primitive.id.trim().length === 0) {
      throw new Error('Primitive ID cannot be empty');
    }
    
    if (this.primitives.has(primitive.id)) {
      console.warn(`Primitive with ID '${primitive.id}' already exists. Overwriting.`);
    }
    
    this.primitives.set(primitive.id, primitive);
  }
  
  /**
   * Remove an attack primitive from the injector
   */
  removePrimitive(id: string): boolean {
    return this.primitives.delete(id);
  }
  
  /**
   * Get list of available primitive IDs
   */
  listPrimitives(): string[] {
    return Array.from(this.primitives.keys()).sort();
  }
  
  /**
   * Get list of available strategy names
   */
  listStrategies(): string[] {
    return Array.from(this.strategies).sort();
  }
  
  /**
   * Add a custom strategy
   */
  addStrategy(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Strategy name cannot be empty');
    }
    
    this.strategies.add(name);
  }
  
  /**
   * Get detailed information about a primitive
   */
  getPrimitiveInfo(id: string): AttackPrimitive | undefined {
    return this.primitives.get(id);
  }
  
  /**
   * Get primitives by target intent
   */
  getPrimitivesByIntent(intent: string): AttackPrimitive[] {
    const result: AttackPrimitive[] = [];
    
    for (const primitive of this.primitives.values()) {
      if (primitive.targetIntents.includes(intent as any)) {
        result.push(primitive);
      }
    }
    
    return result;
  }
  
  /**
   * Register all built-in primitives
   */
  private registerBuiltInPrimitives(): void {
    const primitiveInstances = [
      new GradualTrustBuildingPrimitive(),
      new ContextResetPrimitive(),
      new RoleplayImpersonationPrimitive(),
      new Base64ObfuscationPrimitive(),
      new HexadecimalEncodingPrimitive(),
      new CaesarCipherPrimitive(),
      new FlipAttackPrimitive(),
      new PolicyPuppetryPrimitive()
    ];
    
    for (const primitive of primitiveInstances) {
      this.primitives.set(primitive.id, primitive);
    }
  }
}