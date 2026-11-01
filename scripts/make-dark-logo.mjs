/**
 * One-off generator: builds public/images/kindora-logo-dark.png from the
 * original logo so the wordmark is visible on the dark-mode background.
 *   navy wordmark -> light slate, blue/green accents -> brightened variants.
 * Re-run with: node scripts/make-dark-logo.mjs
 */
import sharp from "sharp";

const { data, info } = await sharp("public/images/kindora-logo.png")
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.from(data.buffer);

for (let i = 0; i < data.length; i += info.channels) {
  if (data[i + 3] === 0) continue; // fully transparent
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  let tr, tg, tb;
  if (b >= 130 && b >= r) {
    // blue accent -> light brand blue
    [tr, tg, tb] = [121, 174, 248];
  } else if (g >= 110 && g > b) {
    // green accent -> light brand green
    [tr, tg, tb] = [88, 215, 149];
  } else if (r < 48 && g < 48) {
    // navy wordmark/dark glyph -> light slate
    [tr, tg, tb] = [226, 232, 240];
  } else {
    continue; // keep whites/unknowns as-is
  }

  // Lerp the antialiased edges rather than snapping, keeps smooth outlines.
  out[i] = Math.round(tr * 0.9 + data[i] * 0.1);
  out[i + 1] = Math.round(tg * 0.9 + data[i + 1] * 0.1);
  out[i + 2] = Math.round(tb * 0.9 + data[i + 2] * 0.1);
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toFile("public/images/kindora-logo-dark.png");

console.log(
  `wrote public/images/kindora-logo-dark.png (${info.width}x${info.height})`,
);
