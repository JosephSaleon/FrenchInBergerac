// Génère l'image de partage (Open Graph) et les icônes à partir des visuels du site.
// Usage : node tools/make-icons.mjs
import sharp from 'sharp';

const svgIcon = await import('node:fs').then((fs) => fs.readFileSync('public/favicon.svg'));
await sharp(svgIcon).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(svgIcon).resize(32, 32).png().toFile('public/favicon-32.png');

const W = 1200, H = 630;
const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#183128" stop-opacity=".92"/><stop offset=".62" stop-color="#183128" stop-opacity=".55"/><stop offset="1" stop-color="#183128" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="120" font-family="Georgia, serif" font-size="30" fill="#d6a24a" letter-spacing="5">BERGERAC · DORDOGNE</text>
  <text x="72" y="270" font-family="Georgia, serif" font-size="84" fill="#f5eee1">French</text>
  <text x="72" y="370" font-family="Georgia, serif" font-size="84" fill="#f5eee1"><tspan fill="#e08a6e">in</tspan> Bergerac</text>
  <text x="72" y="470" font-family="Arial, sans-serif" font-size="32" fill="#f5eee1" opacity=".9">Séjours linguistiques · French immersion stays</text>
</svg>`);
await sharp('src/assets/vieux-pont-bergerac.jpg')
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg');
console.log('ok');
