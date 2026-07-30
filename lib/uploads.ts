import 'server-only';

import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 12_000;
const ALLOWED_FORMATS = new Set(['jpeg', 'png', 'webp', 'gif', 'avif']);
const EXTENSION_BY_FORMAT: Record<string, string> = {
  jpeg: 'jpg',
  png: 'png',
  webp: 'webp',
  gif: 'gif',
  avif: 'avif',
};

export class InvalidUploadError extends Error {}

export async function validateAndReadImage(file: File): Promise<{ buffer: Buffer; extension: string }> {
  if (!file || file.size === 0) {
    throw new InvalidUploadError('An image file is required.');
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new InvalidUploadError('Image files must be 10 MB or smaller.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const metadata = await sharp(buffer, { animated: true }).metadata();
    const format = metadata.format;

    if (!format || !ALLOWED_FORMATS.has(format)) {
      throw new InvalidUploadError('Only JPEG, PNG, WebP, GIF, and AVIF images are allowed.');
    }

    if (
      (metadata.width && metadata.width > MAX_IMAGE_DIMENSION) ||
      (metadata.height && metadata.height > MAX_IMAGE_DIMENSION)
    ) {
      throw new InvalidUploadError('Image dimensions are too large.');
    }

    return { buffer, extension: EXTENSION_BY_FORMAT[format] };
  } catch (error) {
    if (error instanceof InvalidUploadError) throw error;
    throw new InvalidUploadError('The uploaded file is not a valid image.');
  }
}

export async function saveImageLocally(file: File): Promise<string> {
  const { buffer, extension } = await validateAndReadImage(file);
  const filename = `${randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const absolutePath = path.resolve(uploadDir, filename);

  if (!absolutePath.startsWith(`${path.resolve(uploadDir)}${path.sep}`)) {
    throw new InvalidUploadError('Invalid upload destination.');
  }

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(absolutePath, buffer, { flag: 'wx' });
  return `/uploads/${filename}`;
}
