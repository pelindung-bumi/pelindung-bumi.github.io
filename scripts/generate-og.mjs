import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const outputPath = join(rootDir, 'public', 'social', 'pelindung-bumi-og.png');
const logoPath = join(rootDir, 'public', 'icons', 'logo.jpeg');

// Dark mode palette from global.css
// --background: #091310
// --foreground: #EDF1E8
// --primary: #DCE6D3
// --muted-foreground: #9FB0A7
// --card: rgba(12,22,19,0.72)

const W = 1200;
const H = 630;

// Logo: resize to 160x88 (preserving 1024x559 ~= 16:8.7 ratio), placed top-right
const LOGO_W = 160;
const LOGO_H = 88;
const LOGO_X = W - LOGO_W - 72;  // right-aligned with 72px margin
const LOGO_Y = 72;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dark bg gradient: deep forest green bottom-left glow -->
    <radialGradient id="glowBL" cx="0" cy="1" r="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#1A3D2F" stop-opacity="1"/>
      <stop offset="1" stop-color="#091310" stop-opacity="0"/>
    </radialGradient>
    <!-- Top-right subtle glow -->
    <radialGradient id="glowTR" cx="1" cy="0" r="0.8" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#1E4D3A" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#091310" stop-opacity="0"/>
    </radialGradient>
    <!-- Subtle dot grid pattern -->
    <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#DCE6D3" fill-opacity="0.07"/>
    </pattern>
    <!-- Horizontal rule gradient -->
    <linearGradient id="ruleGrad" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DCE6D3" stop-opacity="0.5"/>
      <stop offset="0.6" stop-color="#DCE6D3" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#DCE6D3" stop-opacity="0"/>
    </linearGradient>
    <!-- Left accent bar gradient -->
    <linearGradient id="accentBar" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop stop-color="#DCE6D3" stop-opacity="0"/>
      <stop offset="0.3" stop-color="#DCE6D3" stop-opacity="0.9"/>
      <stop offset="0.7" stop-color="#DCE6D3" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#DCE6D3" stop-opacity="0"/>
    </linearGradient>
    <!-- Logo box border gradient -->
    <linearGradient id="logoBorder" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop stop-color="#9FB0A7" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#9FB0A7" stop-opacity="0.05"/>
    </linearGradient>
  </defs>

  <!-- Base background -->
  <rect width="${W}" height="${H}" fill="#091310"/>
  <!-- Glow overlays -->
  <rect width="${W}" height="${H}" fill="url(#glowBL)"/>
  <rect width="${W}" height="${H}" fill="url(#glowTR)"/>
  <!-- Dot grid texture -->
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Left accent vertical bar -->
  <rect x="64" y="0" width="3" height="${H}" fill="url(#accentBar)"/>

  <!-- Top section: site label pill -->
  <rect x="88" y="68" width="196" height="36" rx="18" fill="#1A3D2F"/>
  <rect x="88.5" y="68.5" width="195" height="35" rx="17.5" stroke="#DCE6D3" stroke-opacity="0.15"/>
  <text x="186" y="92" text-anchor="middle"
    fill="#9FB0A7"
    font-family="'IBM Plex Mono', 'Courier New', monospace"
    font-size="14"
    font-weight="500"
    letter-spacing="0.12em">PELINDUNG BUMI</text>

  <!-- Logo box: top-right, constrained within canvas -->
  <rect x="${LOGO_X - 12}" y="${LOGO_Y - 12}" width="${LOGO_W + 24}" height="${LOGO_H + 24}" rx="14" fill="#0D1F1A"/>
  <rect x="${LOGO_X - 11.5}" y="${LOGO_Y - 11.5}" width="${LOGO_W + 23}" height="${LOGO_H + 23}" rx="13.5" stroke="url(#logoBorder)" stroke-width="1"/>

  <!-- Headline -->
  <text x="88" y="234"
    fill="#EDF1E8"
    font-family="'Fraunces', 'Georgia', 'Times New Roman', serif"
    font-size="96"
    font-weight="700"
    letter-spacing="-0.02em">Learn infra</text>
  <text x="88" y="336"
    fill="#EDF1E8"
    font-family="'Fraunces', 'Georgia', 'Times New Roman', serif"
    font-size="96"
    font-weight="700"
    letter-spacing="-0.02em">in public.</text>

  <!-- Horizontal divider -->
  <rect x="88" y="368" width="520" height="1.5" fill="url(#ruleGrad)"/>

  <!-- Subtext — short enough to not overflow -->
  <text x="88" y="406"
    fill="#9FB0A7"
    font-family="'IBM Plex Sans', 'Arial', sans-serif"
    font-size="24"
    font-weight="400"
    letter-spacing="0.01em">Kubernetes · cloud · SRE · DevOps</text>

  <!-- URL chip at bottom-left -->
  <rect x="88" y="518" width="238" height="44" rx="22" fill="#1A3D2F"/>
  <rect x="88.5" y="518.5" width="237" height="43" rx="21.5" stroke="#DCE6D3" stroke-opacity="0.18"/>
  <text x="207" y="546" text-anchor="middle"
    fill="#DCE6D3"
    font-family="'IBM Plex Mono', 'Courier New', monospace"
    font-size="18"
    font-weight="500"
    letter-spacing="0.04em">pelindungbumi.dev</text>

  <!-- Tagline bottom right, safely left of right edge -->
  <text x="${W - 72}" y="526"
    text-anchor="end"
    fill="#EDF1E8"
    font-family="'IBM Plex Sans', 'Arial', sans-serif"
    font-size="22"
    font-weight="600"
    opacity="0.55">Just infra things.</text>
</svg>`;

// Resize logo to fit cleanly in its box (16:8.7 ~= letter-box)
const logoBuffer = await sharp(logoPath)
  .resize({
    width: LOGO_W,
    height: LOGO_H,
    fit: 'contain',
    background: { r: 13, g: 31, b: 26, alpha: 1 }, // #0D1F1A — dark card bg
  })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([
    {
      input: logoBuffer,
      left: LOGO_X,
      top: LOGO_Y,
    },
  ])
  .png()
  .toFile(outputPath);

console.log(`Generated ${outputPath} (${W}x${H})`);
