import { mkdir, copyFile, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
for (const file of ['index.html', 'game.js']) {
  await copyFile(file, `dist/${file}`);
}
for (const room of ['stair', 'lamp', 'kitchen', 'rocks']) {
  await copyFile(`assets/${room}-hk.png`, `dist/assets/${room}-hk.png`);
}
console.log('Packaged the page, compiled game and four room images in dist.');
