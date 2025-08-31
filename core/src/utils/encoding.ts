/**
 * Encoding utilities that work in both Node.js and browser environments
 */

/**
 * Encode string to base64
 * Works in both Node.js and browser environments
 */
export function encodeBase64(text: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js environment
    return Buffer.from(text).toString('base64');
  } else {
    // Browser environment - modern approach
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    return btoa(String.fromCharCode(...Array.from(data)));
  }
}

/**
 * Encode string to hexadecimal
 * Works in both Node.js and browser environments
 */
export function encodeHex(text: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js environment
    return Buffer.from(text).toString('hex');
  } else {
    // Browser environment
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
  }
}

/**
 * Decode base64 string
 * Works in both Node.js and browser environments
 */
export function decodeBase64(encoded: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js environment
    return Buffer.from(encoded, 'base64').toString('utf-8');
  } else {
    // Browser environment - modern approach
    const decoded = atob(encoded);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  }
}

/**
 * Decode hexadecimal string
 * Works in both Node.js and browser environments
 */
export function decodeHex(encoded: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js environment
    return Buffer.from(encoded, 'hex').toString('utf-8');
  } else {
    // Browser environment
    let result = '';
    for (let i = 0; i < encoded.length; i += 2) {
      result += String.fromCharCode(parseInt(encoded.substring(i, i + 2), 16));
    }
    return result;
  }
}