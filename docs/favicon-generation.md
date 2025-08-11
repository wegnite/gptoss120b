# Favicon Generation Guide for GPT-OSS-120B

## Design Concept

The GPT-OSS-120B favicon features:
- **Purple to Pink Gradient**: Using `#a855f7` to `#ec4899` gradient (avoiding blue/indigo)
- **Neural Network Symbol**: Nodes forming a "G" shape representing AI/neural networks
- **"120" Center Text**: Subtly embedded in the center node
- **Adaptive Design**: Two versions - detailed for large sizes, simplified for small sizes

## Files Created

### SVG Source Files
- `/public/favicon.svg` - Main detailed design (512x512)
- `/public/favicon-simple.svg` - Simplified version for small sizes (32x32)

### Generation Script
- `/scripts/generate-favicons.js` - Node.js script to generate all favicon formats

### React Component
- `/components/FaviconMeta.tsx` - Meta tags component for HTML head

## How to Generate Favicons

### 1. Install Dependencies

```bash
npm install -D sharp @resvg/resvg-js
# or
pnpm add -D sharp @resvg/resvg-js
```

### 2. Run Generation Script

```bash
node scripts/generate-favicons.js
```

This will generate:
- Standard favicon PNGs (16x16, 32x32, 48x48, 96x96, 192x192)
- Apple touch icons (57x57 to 180x180)
- Android Chrome icons (192x192, 512x512)
- Microsoft tile icons (70x70, 144x144, 150x150, 310x310)
- `site.webmanifest` for PWA support
- `browserconfig.xml` for Microsoft Edge

### 3. Create favicon.ico

Since Node.js doesn't have native ICO support, use one of these methods:

#### Option A: Online Converter (Recommended)
1. Visit [favicon.io](https://favicon.io/favicon-converter/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload the generated PNG files (16x16, 32x32, 48x48)
3. Download the generated `favicon.ico`
4. Place it in `/public/favicon.ico`

#### Option B: Command Line (ImageMagick)
```bash
# Install ImageMagick if not already installed
brew install imagemagick  # macOS
# or
sudo apt-get install imagemagick  # Ubuntu/Debian

# Generate favicon.ico
convert public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon.ico
```

#### Option C: npm package
```bash
npm install -g png-to-ico
png-to-ico public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png > public/favicon.ico
```

## Integration with Next.js

### 1. Add to Root Layout

In your `app/layout.tsx` or `app/[locale]/layout.tsx`:

```tsx
import FaviconMeta from '@/components/FaviconMeta';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <FaviconMeta />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Or Add Directly to Metadata

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#a855f7' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#a855f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};
```

## Testing Your Favicons

### Browser Testing
1. Clear browser cache
2. Visit your site
3. Check the browser tab for the favicon
4. Bookmark the page and check bookmark icon
5. Add to home screen on mobile devices

### Validation Tools
- [Favicon Checker](https://realfavicongenerator.net/favicon_checker)
- [SEO Site Checkup Favicon Test](https://seositecheckup.com/tools/favicon-test)

## Color Palette

- Primary Purple: `#a855f7`
- Secondary Pink: `#ec4899`
- Accent Orange: `#f97316`
- Background Dark: `#0a0a0a`
- Background Light: `#ffffff`

## Design Variations

If you need to modify the design:

1. Edit `/public/favicon.svg` for the main design
2. Edit `/public/favicon-simple.svg` for the simplified version
3. Re-run the generation script
4. Update colors in `site.webmanifest` and `browserconfig.xml` if needed

## Troubleshooting

### Favicon Not Showing
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check DevTools Network tab for 404 errors
- Ensure files are in `/public` directory

### Wrong Colors in Dark Mode
- Check `theme-color` meta tags
- Verify `prefers-color-scheme` media queries

### Blurry on Retina Displays
- Ensure high-resolution versions (192x192, 512x512) are generated
- Check that SVG source is being used for supported browsers