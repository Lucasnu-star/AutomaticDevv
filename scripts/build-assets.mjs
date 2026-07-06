import sharp from "sharp";

const BG = { r: 0, g: 3, b: 10 };
const SRC = "referencias/Logo/logo.jpg";

async function chromaKey(inputPath, outputPath, bg = BG, threshold = 40) {
  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = Math.sqrt((r - bg.r) ** 2 + (g - bg.g) ** 2 + (b - bg.b) ** 2);

    if (dist < threshold) {
      data[i + 3] = 0;
    } else if (dist < threshold * 2.2) {
      data[i + 3] = Math.round(
        (255 * (dist - threshold)) / (threshold * 1.2)
      );
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);
}

// 1. Full lockup (icon + wordmark + tagline), trimmed of excess padding.
await sharp(SRC)
  .trim({ threshold: 15 })
  .png()
  .toFile("public/logo-full.png");

// 1b. Same lockup with the near-black backdrop keyed out to transparency,
// so it blends into any dark gradient background without a visible box.
await chromaKey("public/logo-full.png", "public/logo-full-transparent.png");

// 2. Icon-only mark, cropped from the trimmed lockup, padded to a square on brand bg.
await sharp("public/logo-full.png")
  .extract({ left: 120, top: 0, width: 644, height: 320 })
  .resize({
    width: 640,
    height: 640,
    fit: "contain",
    background: BG,
  })
  .png()
  .toFile("public/icon-mark.png");

// 3. Favicon sizes
await sharp("public/icon-mark.png").resize(32, 32).png().toFile("public/favicon-32.png");
await sharp("public/icon-mark.png").resize(16, 16).png().toFile("public/favicon-16.png");
await sharp("public/icon-mark.png").resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp("public/icon-mark.png").resize(512, 512).png().toFile("public/icon-512.png");

// 4. Open Graph image (1200x630) with brand glow backdrop + centered lockup
const OG_W = 1200;
const OG_H = 630;
const bgSvg = Buffer.from(`
<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="30%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="75%" cy="65%" r="55%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="#00030a"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#g1)"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#g2)"/>
</svg>
`);

const lockup = await sharp("public/logo-full-transparent.png")
  .resize({ width: 720 })
  .toBuffer();
const lockupMeta = await sharp(lockup).metadata();

await sharp(bgSvg)
  .composite([
    {
      input: lockup,
      left: Math.round((OG_W - (lockupMeta.width ?? 720)) / 2),
      top: Math.round((OG_H - (lockupMeta.height ?? 440)) / 2),
    },
  ])
  .png()
  .toFile("public/og-image.png");

console.log("assets built");
