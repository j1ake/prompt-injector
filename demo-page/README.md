# Prompt Injector Demo Page

Beautiful Apple HIG-inspired demo page for the Prompt Injector library.

## Features

- **🎯 Interactive Demo**: Generate attack conversations with different strategies
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🎨 Apple HIG Inspired**: Clean, accessible design following Apple's Human Interface Guidelines
- **📚 Research Citations**: Proper academic citations and research backing
- **⚡ Fast Performance**: Built with SvelteKit and optimized for speed
- **♿ Accessible**: WCAG compliant with proper focus states and semantic HTML

## Design Principles

### Apple Human Interface Guidelines
- **Clarity**: Clear visual hierarchy and readable typography
- **Deference**: Interface defers to content, subtle visual elements
- **Depth**: Layered interface with appropriate shadows and elevation
- **System Fonts**: Uses Apple's system font stack for optimal readability
- **Focus States**: Proper keyboard navigation and focus indicators
- **Responsive**: Adapts beautifully to all screen sizes

### Security-First Approach
- **Experimental Warnings**: Clear disclaimers about experimental status
- **Responsible Use**: Prominent guidelines for appropriate usage
- **Research Context**: Every generated attack includes research citations
- **Defensive Focus**: Emphasizes testing your own systems only

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **SvelteKit**: Fast, modern web framework
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool

## Integration

The demo page imports and uses the Prompt Injector library from `../core/dist/index.js`, providing a real-time demonstration of the library's capabilities.

## Deployment

This demo is designed to be deployed to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

The build output is optimized for static deployment with proper SEO meta tags and social media previews.
