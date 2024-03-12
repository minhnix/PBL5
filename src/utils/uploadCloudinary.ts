import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadPhotoCloudinary(file: any) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;

  const res = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  return { url: res.url, type: "photo" };
}

export { uploadPhotoCloudinary };
