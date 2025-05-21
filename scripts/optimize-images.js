const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 80; // JPEG quality
const MAX_WIDTH = 1920; // Maximum width for images

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const stats = fs.statSync(filePath);
  const fileSize = stats.size / 1024; // Size in KB

  // Only optimize if file is larger than 100KB
  if (fileSize < 100) return;

  console.log(`Optimizing ${filePath} (${fileSize.toFixed(2)}KB)`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if width is larger than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to WebP for better compression
    const outputPath = filePath.replace(ext, '.webp');
    await image
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    // Get new file size
    const newStats = fs.statSync(outputPath);
    const newFileSize = newStats.size / 1024;
    const savings = ((fileSize - newFileSize) / fileSize * 100).toFixed(2);

    console.log(`✓ Optimized to ${newFileSize.toFixed(2)}KB (${savings}% smaller)`);

    // Remove original file if WebP is smaller
    if (newFileSize < fileSize) {
      fs.unlinkSync(filePath);
      console.log(`✓ Removed original file`);
    } else {
      fs.unlinkSync(outputPath);
      console.log(`✗ Kept original file (WebP was larger)`);
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await optimizeImage(filePath);
    }
  }
}

// Start optimization
console.log('Starting image optimization...');
processDirectory(PUBLIC_DIR)
  .then(() => console.log('Image optimization complete!'))
  .catch(console.error); 