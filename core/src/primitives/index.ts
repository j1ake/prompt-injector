/**
 * Export all attack primitives
 */

export { BasePrimitive } from './base.js';
export { GradualTrustBuildingPrimitive } from './trust-building.js';
export { ContextResetPrimitive } from './context-reset.js';
export { RoleplayImpersonationPrimitive } from './roleplay.js';
export { Base64ObfuscationPrimitive, HexadecimalEncodingPrimitive, CaesarCipherPrimitive } from './encoding.js';
export { FlipAttackPrimitive } from './flip-attack.js';
export { PolicyPuppetryPrimitive } from './policy-puppetry.js';

// Built-in primitives list for easy registration
export const BUILT_IN_PRIMITIVES = [
  'gradual-trust-building',
  'context-reset',
  'roleplay-impersonation',
  'base64-obfuscation',
  'hexadecimal-encoding',
  'caesar-cipher',
  'flip-attack',
  'policy-puppetry'
] as const;