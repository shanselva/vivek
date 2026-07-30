import { v2 as cloudinary } from 'cloudinary';
import { validateAndReadImage } from '@/lib/uploads';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function uploadToCloudinary(file: File, folder: string = 'construction-website'): Promise<string> {
  const { buffer } = await validateAndReadImage(file);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Unknown Cloudinary upload error'));
        }
      }
    );

    
    uploadStream.end(buffer);
  });
}
