/**
 * Core types for the Prompt Injector library
 * Based on the experimental V0.1 design
 */

export type AttackIntent = 
  | 'data-exfiltration'     // Extract training data, user info, system prompts
  | 'safety-bypass'         // Generate harmful or prohibited content
  | 'privilege-escalation'  // Gain unauthorized access or permissions
  | 'instruction-override'  // Modify system behavior, ignore guidelines
  | 'information-disclosure'; // Leak sensitive system information

export type ObfuscationLevel = 'none' | 'light' | 'heavy';

export type Timing = 'opener' | 'middle' | 'closer' | 'any';

export interface Turn {
  message: string;      // The attack message to test
  primitive: string;    // Primitive ID that generated this turn
  turnNumber: number;   // Turn position (1-based)
  technique?: string;   // Specific technique used (optional)
}

export interface ConversationContext {
  goal: string;           // Original attack goal
  turnNumber: number;     // Current turn number (1-based)
  previousTurns: Turn[];  // Previously generated turns
  strategy: string;       // Selected strategy
}

export interface AttackPrimitive {
  readonly id: string;          // Unique primitive identifier
  readonly name: string;        // Human-readable name
  readonly description: string; // Brief description
  
  // Core generation method
  generate(goal: string, context: ConversationContext): Turn;
  
  // Timing and compatibility
  readonly timing: Timing[];
  readonly canFollow?: string[]; // Compatible predecessor primitives
  
  // Research context (not performance guarantees)
  readonly researchNotes?: string;    // Research context or citation
  readonly obfuscationLevel: ObfuscationLevel;
  readonly targetIntents: AttackIntent[];
}

export interface AttackOptions {
  strategy?: string;           // 'gradual' | 'roleplay' | 'obfuscated' | 'direct'
  maxTurns?: number;          // Default: 4, Maximum conversation length
  preferredPrimitives?: string[]; // Hint for primitive selection
}

export interface AttackConversation {
  goal: string;                // Original attack goal
  strategy: string;            // Strategy used
  turns: Turn[];              // Conversation turns
  metadata: {
    generatedAt: Date;        // Generation timestamp
    primitivesUsed: string[]; // Primitives used in sequence
    researchBasis: string[];  // Research context (not performance guarantees)
  };
}