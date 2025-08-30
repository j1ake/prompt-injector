# Publishing Guide

This guide explains how to publish the Prompt Injector library to npm from the `/core` directory.

## Prerequisites

1. **npm account**: Make sure you have an npm account and are logged in
   ```bash
   npm login
   ```

2. **Organization access**: Ensure you have access to the `@blueprintlabio` organization on npm

## Publishing Process

The library is published directly from the `/core` directory, which contains the compiled TypeScript library.

1. **Navigate to core directory**:
   ```bash
   cd core/
   ```

2. **Update version** (if needed):
   ```bash
   npm version patch  # or minor, major
   ```

3. **Test the library** (optional):
   ```bash
   # Test by importing the library
   node -e "import('./index.js').then(m => console.log('✅ Library loads successfully', Object.keys(m)))"
   ```

4. **Publish to npm**:
   ```bash
   npm publish
   ```

## Quick Publish Script

You can also use this one-liner from the project root:

```bash
cd core && npm publish && cd ..
```

## Package Details

- **Name**: `@blueprintlabio/prompt-injector`
- **Scope**: `@blueprintlabio` (public)
- **Main entry**: `index.js`
- **TypeScript types**: `index.d.ts`
- **License**: MIT

## Files Included in Package

The `/core` directory contains all the files that will be published:
- `*.js` - Compiled JavaScript modules
- `*.d.ts` - TypeScript definition files  
- `attacks/` - Attack pattern definitions
- `generators/` - Test case generation logic
- `evaluators/` - Response evaluation logic
- `package.json` - Package configuration
- `README.md` - Library documentation

## Post-Publication

After publishing, the package will be available at:
- npm: https://www.npmjs.com/package/@blueprintlabio/prompt-injector
- Install: `npm install @blueprintlabio/prompt-injector`

## Demo Site

The interactive demo runs separately and is not included in the npm package. To run the demo locally from project root:

```bash
npm run dev
```

The demo site uses the core library but is a separate Svelte application for showcasing the functionality.