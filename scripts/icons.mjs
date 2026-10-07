import sharp from "sharp";

const src = "public/img/favicon.jpg";
const bg = "#4f1218";

await sharp(src).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(src).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(src).resize(180, 180).png().toFile("app/apple-icon.png");

// maskable: logo ridotto con margine di sicurezza
await sharp(src)
  .resize(360, 360, { fit: "contain", background: bg })
  .extend({ top: 76, bottom: 76, left: 76, right: 76, background: bg })
  .png()
  .toFile("public/icon-512-maskable.png");

console.log("Icone generate");