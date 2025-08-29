# Publishing Guide

This guide explains how to publish the Prompt Injector library to npm.

## Prerequisites

1. **npm account**: Make sure you have an npm account and are logged in
   ```bash
   npm login
   ```

2. **Organization access**: Ensure you have access to the `@blueprintlabio` organization on npm

## Publishing Process

1. **Build the library**:
   ```bash
   npm run build:lib
   ```

2. **Test the build**:
   ```bash
   # Test locally by importing from dist/
   node -e "import('./dist/index.js').then(m => console.log('✅ Library loads successfully'))"
   ```

3. **Update version** (if needed):
   ```bash
   npm version patch  # or minor, major
   ```

4. **Publish to npm**:
   ```bash
   # The package is configured to publish publicly by default
   npm publish
   ```

## Package Details

- **Name**: `@blueprintlabio/prompt-injector`
- **Scope**: `@blueprintlabio` (public)
- **Main entry**: `dist/index.js`
- **TypeScript types**: `dist/index.d.ts`
- **License**: MIT

## Files Included in Package

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - MIT license

## Post-Publication

After publishing, the package will be available at:
- npm: https://www.npmjs.com/package/@blueprintlabio/prompt-injector
- Install: `npm install @blueprintlabio/prompt-injector`

## Demo Site

The interactive demo runs separately and is not included in the npm package. To run the demo locally:

```bash
npm run dev
```