import multer from 'multer';
import cloudinaryV2 from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  folder: 'crew finder',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [
    {
      width: 500,
      height: 500,
      crop: 'limit',
    },
  ],
});
const upload = multer({ storage: storage });

export default upload;
