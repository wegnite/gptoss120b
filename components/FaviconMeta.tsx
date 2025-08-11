/**
 * Favicon Meta Tags Component
 * 
 * Add this component to your root layout or document head
 * to include all favicon and app icon meta tags.
 */

export default function FaviconMeta() {
  return (
    <>
      {/* Primary favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      
      {/* PNG icons for different sizes */}
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
      
      {/* Android Chrome manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Safari pinned tab icon */}
      <link rel="mask-icon" href="/favicon.svg" color="#a855f7" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#a855f7" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Theme colors */}
      <meta name="theme-color" content="#a855f7" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      
      {/* PWA capable */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="GPT-120B" />
      <meta name="application-name" content="GPT-OSS-120B" />
    </>
  );
}