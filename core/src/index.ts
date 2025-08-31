/**
 * Prompt Injector - Experimental TypeScript library for generating AI security test conversations
 * 
 * @packageDocumentation
 */

// Main class
export { PromptInjector } from './prompt-injector.js';

// Core types
export type {
  AttackIntent,
  ObfuscationLevel,
  Timing,
  Turn,
  ConversationContext,
  AttackPrimitive,
  AttackOptions,
  AttackConversation
} from './types.js';

// Base primitive class for custom implementations
export { BasePrimitive } from './primitives/base.js';

// Built-in primitives (for advanced users)
export {
  GradualTrustBuildingPrimitive,
  ContextResetPrimitive,
  RoleplayImpersonationPrimitive,
  Base64ObfuscationPrimitive,
  HexadecimalEncodingPrimitive,
  CaesarCipherPrimitive,
  FlipAttackPrimitive,
  PolicyPuppetryPrimitive,
  BUILT_IN_PRIMITIVES
} from './primitives/index.js';

// Utilities
export { encodeBase64, encodeHex, decodeBase64, decodeHex } from './utils/encoding.js';

// Conversation builder (for advanced users)
export { ConversationBuilder } from './conversation-builder.js';

/**
 * Version information
 */
export const VERSION = '0.1.0';

/**
 * Library information
 */
export const LIBRARY_INFO = {
  name: '@blueprintlabio/prompt-injector',
  version: VERSION,
  description: 'Experimental TypeScript library for generating AI security test conversations',
  experimental: true,
  builtInPrimitives: 8, // Number of built-in primitives
  defaultStrategies: ['gradual', 'roleplay', 'obfuscated', 'direct']
} as const;