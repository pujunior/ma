/**
 * Atualiza assets/images/manifest.json com todas as imagens da pasta.
 * Execute na raiz do site (onde está index.html):
 *
 *   node scripts/update-gallery-manifest.js
 */
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "..", "assets", "images");
const manifestPath = path.join(imagesDir, "manifest.json");

const SKIP = new Set(["manifest.json", "favicon.svg"]);
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|svg|avif)$/i;

const files = fs
  .readdirSync(imagesDir)
  .filter((name) => !SKIP.has(name) && IMAGE_EXT.test(name) && !name.startsWith("placeholder-casal"))
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + "\n", "utf8");
console.log(`manifest.json atualizado com ${files.length} imagem(ns).`);
