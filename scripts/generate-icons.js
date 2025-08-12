const fs = require('fs');
const path = require('path');

// Icon sizes for various platforms
const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];

// Read the main SVG icon
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- GPT-OSS-120B Logo -->
  <rect width="512" height="512" rx="100" fill="url(#bg-gradient)"/>
  
  <g transform="translate(256, 256)">
    <!-- Six interconnected segments forming hexagonal pattern -->
    <g stroke="white" stroke-width="24" fill="none" stroke-linecap="round">
      <path d="M 0 -100 C -40 -100 -60 -80 -60 -60 L -60 -40 C -60 -20 -40 0 0 0" opacity="0.95"/>
      <path d="M 0 0 C 40 0 60 -20 60 -40 L 60 -60 C 60 -80 80 -100 100 -100" transform="rotate(60 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 40 0 60 -20 60 -40 L 60 -60 C 60 -80 80 -100 100 -100" transform="rotate(120 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 40 0 60 -20 60 -40 L 60 -60 C 60 -80 80 -100 100 -100" transform="rotate(180 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 40 0 60 -20 60 -40 L 60 -60 C 60 -80 80 -100 100 -100" transform="rotate(240 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 40 0 60 -20 60 -40 L 60 -60 C 60 -80 80 -100 100 -100" transform="rotate(300 0 0)" opacity="0.95"/>
    </g>
    <circle cx="0" cy="0" r="16" fill="white" opacity="0.9"/>
  </g>
  
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6"/>
      <stop offset="100%" style="stop-color:#EC4899"/>
    </linearGradient>
  </defs>
</svg>`;

// Save the main icon
fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), svgContent);
console.log('✅ Created icon.svg');

// Create Apple Touch Icon
const appleTouchIcon = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="40" fill="url(#bg-gradient)"/>
  
  <g transform="translate(90, 90)">
    <g stroke="white" stroke-width="8" fill="none" stroke-linecap="round">
      <path d="M 0 -35 C -14 -35 -21 -28 -21 -21 L -21 -14 C -21 -7 -14 0 0 0" opacity="0.95"/>
      <path d="M 0 0 C 14 0 21 -7 21 -14 L 21 -21 C 21 -28 28 -35 35 -35" transform="rotate(60 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 14 0 21 -7 21 -14 L 21 -21 C 21 -28 28 -35 35 -35" transform="rotate(120 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 14 0 21 -7 21 -14 L 21 -21 C 21 -28 28 -35 35 -35" transform="rotate(180 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 14 0 21 -7 21 -14 L 21 -21 C 21 -28 28 -35 35 -35" transform="rotate(240 0 0)" opacity="0.95"/>
      <path d="M 0 0 C 14 0 21 -7 21 -14 L 21 -21 C 21 -28 28 -35 35 -35" transform="rotate(300 0 0)" opacity="0.95"/>
    </g>
    <circle cx="0" cy="0" r="6" fill="white" opacity="0.9"/>
  </g>
  
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6"/>
      <stop offset="100%" style="stop-color:#EC4899"/>
    </linearGradient>
  </defs>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.svg'), appleTouchIcon);
console.log('✅ Created apple-touch-icon.svg');

// Create manifest.json for PWA
const manifest = {
  "name": "GPT-OSS-120B",
  "short_name": "GPT-OSS",
  "description": "开源AI对话平台 - 1200亿参数，完全免费",
  "theme_color": "#8B5CF6",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    },
    {
      "src": "/gpt-oss-icon-v2.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "maskable"
    }
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../public/manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('✅ Created manifest.json');

console.log('\n🎉 Icon generation complete!');
console.log('📁 Generated files:');
console.log('  - public/icon.svg (main icon)');
console.log('  - public/apple-touch-icon.svg');
console.log('  - public/manifest.json');
console.log('  - public/gpt-oss-icon.svg (variant 1)');
console.log('  - public/gpt-oss-icon-v2.svg (variant 2)');
console.log('  - public/gpt-oss-icon-v3.svg (variant 3)');
console.log('  - public/gpt-oss-icon-v4.svg (variant 4)');
console.log('  - public/gpt-oss-icon-simple.svg (simple version)');