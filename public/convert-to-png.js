// Run this in your browser console on https://convertico.com/
(function() {
  const svg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 32, 32);
    canvas.toBlob(function(blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'favicon.png';
      a.click();
    });
  };
  img.src = url;
})();