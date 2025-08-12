const fs = require('fs');
const path = require('path');

// Create a simple script to generate PNG from SVG using canvas
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="url(#bg-gradient)"/>
  
  <g transform="translate(256, 256)">
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

// Create SVG files for different sizes
const sizes = [16, 32, 48, 64, 128, 256];

sizes.forEach(size => {
  const scaledSvg = svgContent.replace('width="512"', `width="${size}"`).replace('height="512"', `height="${size}"`);
  const filename = path.join(__dirname, `../public/favicon-${size}.svg`);
  fs.writeFileSync(filename, scaledSvg);
  console.log(`✅ Created favicon-${size}.svg`);
});

// Create a web page to help convert to ICO
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favicon ICO Generator</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #8B5CF6;
            text-align: center;
        }
        .icon-preview {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
            margin: 30px 0;
        }
        .icon-box {
            text-align: center;
            padding: 10px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }
        .icon-box img {
            display: block;
            margin: 0 auto 10px;
        }
        .icon-box span {
            color: #6b7280;
            font-size: 12px;
        }
        canvas {
            display: none;
        }
        button {
            background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            display: block;
            margin: 30px auto;
        }
        button:hover {
            opacity: 0.9;
        }
        .instructions {
            background: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }
        .instructions h2 {
            color: #374151;
            margin-top: 0;
        }
        .instructions ol {
            color: #4b5563;
        }
        .instructions a {
            color: #8B5CF6;
            text-decoration: none;
        }
        .instructions a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 GPT-OSS-120B Favicon Generator</h1>
        
        <div class="icon-preview">
            <div class="icon-box">
                <img src="/icon.svg" width="64" height="64">
                <span>64x64</span>
            </div>
            <div class="icon-box">
                <img src="/icon.svg" width="48" height="48">
                <span>48x48</span>
            </div>
            <div class="icon-box">
                <img src="/icon.svg" width="32" height="32">
                <span>32x32</span>
            </div>
            <div class="icon-box">
                <img src="/icon.svg" width="16" height="16">
                <span>16x16</span>
            </div>
        </div>

        <canvas id="canvas"></canvas>

        <button onclick="downloadPNG()">Download PNG (256x256)</button>

        <div class="instructions">
            <h2>📝 Instructions to Generate ICO</h2>
            <ol>
                <li>Click "Download PNG" button above to get the PNG file</li>
                <li>Go to <a href="https://favicon.io/favicon-converter/" target="_blank">Favicon.io Converter</a></li>
                <li>Upload the downloaded PNG file</li>
                <li>Click "Download" to get your favicon.ico package</li>
                <li>Extract the zip file and copy favicon.ico to your public folder</li>
            </ol>
            
            <h3>Alternative Online Converters:</h3>
            <ul>
                <li><a href="https://convertico.com/" target="_blank">ConvertICO</a> - Simple PNG to ICO converter</li>
                <li><a href="https://www.icoconverter.com/" target="_blank">ICO Converter</a> - Supports multiple sizes</li>
                <li><a href="https://realfavicongenerator.net/" target="_blank">RealFaviconGenerator</a> - Professional tool</li>
            </ul>
        </div>
    </div>

    <script>
        function downloadPNG() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 256;
            canvas.height = 256;
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 256, 256);
            gradient.addColorStop(0, '#8B5CF6');
            gradient.addColorStop(1, '#EC4899');
            
            // Draw rounded rectangle background
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(0, 0, 256, 256, 50);
            ctx.fill();
            
            // Draw the hexagonal pattern
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 12;
            ctx.lineCap = 'round';
            ctx.globalAlpha = 0.95;
            
            // Center point
            const cx = 128;
            const cy = 128;
            
            // Draw six interconnected segments
            for (let i = 0; i < 6; i++) {
                const angle = (i * 60) * Math.PI / 180;
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                
                ctx.beginPath();
                ctx.moveTo(0, -50);
                ctx.bezierCurveTo(-20, -50, -30, -40, -30, -30);
                ctx.lineTo(-30, -20);
                ctx.bezierCurveTo(-30, -10, -20, 0, 0, 0);
                ctx.stroke();
                
                ctx.restore();
            }
            
            // Draw center circle
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            // Download
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'gpt-oss-favicon-256.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
    </script>
</body>
</html>`;

// Save the HTML file
fs.writeFileSync(path.join(__dirname, '../public/favicon-generator.html'), htmlContent);
console.log('✅ Created favicon-generator.html');

console.log('\n📋 Next Steps:');
console.log('1. Open http://localhost:3002/favicon-generator.html');
console.log('2. Click "Download PNG" to get the PNG file');
console.log('3. Go to https://favicon.io/favicon-converter/');
console.log('4. Upload the PNG and download the ICO file');
console.log('5. Replace public/favicon.ico with the new file');