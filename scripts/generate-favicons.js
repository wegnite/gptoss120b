#!/usr/bin/env node

/**
 * Favicon Generation Script for GPT-OSS-120B
 * 
 * This script generates all necessary favicon files from the SVG source.
 * 
 * Prerequisites:
 * npm install -D sharp @resvg/resvg-js
 * 
 * Usage:
 * node scripts/generate-favicons.js
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Favicon sizes configuration
const FAVICON_SIZES = {
  // ICO component sizes
  ico: [16, 32, 48],
  
  // PNG favicons for modern browsers
  png: [16, 32, 96, 192],
  
  // Apple touch icons
  apple: [57, 60, 72, 76, 114, 120, 144, 152, 180],
  
  // Android Chrome
  android: [192, 512],
  
  // Microsoft tiles
  ms: [70, 144, 150, 310]
};

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  const simpleSvgPath = path.join(publicDir, 'favicon-simple.svg');
  
  try {
    // Read the main SVG file
    const svgBuffer = await fs.readFile(svgPath);
    const simpleSvgBuffer = await fs.readFile(simpleSvgPath);
    
    console.log('🎨 Generating favicons for GPT-OSS-120B...\n');
    
    // Generate standard favicon.ico (using simple version for clarity at small sizes)
    console.log('📦 Creating favicon.ico...');
    const ico16 = await sharp(simpleSvgBuffer).resize(16, 16).png().toBuffer();
    const ico32 = await sharp(simpleSvgBuffer).resize(32, 32).png().toBuffer();
    const ico48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
    
    // Note: For actual ICO generation, you'll need to use an ICO encoder
    // For now, we'll create individual PNGs that can be combined using online tools
    await sharp(simpleSvgBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
    await sharp(simpleSvgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48x48.png'));
    
    // Generate PNG favicons
    console.log('🖼️  Creating PNG favicons...');
    for (const size of FAVICON_SIZES.png) {
      const buffer = size <= 32 ? simpleSvgBuffer : svgBuffer;
      await sharp(buffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
      console.log(`   ✓ favicon-${size}x${size}.png`);
    }
    
    // Generate Apple touch icons
    console.log('🍎 Creating Apple touch icons...');
    for (const size of FAVICON_SIZES.apple) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `apple-touch-icon-${size}x${size}.png`));
      console.log(`   ✓ apple-touch-icon-${size}x${size}.png`);
    }
    
    // Generate main apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('   ✓ apple-touch-icon.png (180x180)');
    
    // Generate Android Chrome icons
    console.log('🤖 Creating Android Chrome icons...');
    for (const size of FAVICON_SIZES.android) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `android-chrome-${size}x${size}.png`));
      console.log(`   ✓ android-chrome-${size}x${size}.png`);
    }
    
    // Generate Microsoft tile icons
    console.log('🪟 Creating Microsoft tile icons...');
    for (const size of FAVICON_SIZES.ms) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `mstile-${size}x${size}.png`));
      console.log(`   ✓ mstile-${size}x${size}.png`);
    }
    
    // Generate manifest.json for PWA
    console.log('\n📱 Creating site.webmanifest...');
    const manifest = {
      name: 'GPT-OSS-120B',
      short_name: 'GPT-120B',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#a855f7',
      background_color: '#0a0a0a',
      display: 'standalone',
      start_url: '/',
      orientation: 'portrait'
    };
    
    await fs.writeFile(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('   ✓ site.webmanifest');
    
    // Generate browserconfig.xml for Microsoft
    console.log('\n🪟 Creating browserconfig.xml...');
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <TileColor>#a855f7</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    
    await fs.writeFile(path.join(publicDir, 'browserconfig.xml'), browserConfig);
    console.log('   ✓ browserconfig.xml');
    
    console.log('\n✨ All favicons generated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Use an online ICO converter to combine the PNG files into favicon.ico');
    console.log('2. Add the following to your HTML <head>:');
    console.log(`
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/favicon.svg" color="#a855f7">
<meta name="msapplication-TileColor" content="#a855f7">
<meta name="theme-color" content="#a855f7">
    `);
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

// Run the script
generateFavicons();