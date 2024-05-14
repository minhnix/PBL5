import { AppError } from "./appError";

export const filterImage = (req, file, cb) => {
  cb(null, true);
  // if (file.mimetype.startsWith("image")) {
  //   cb(null, true);
  // } else {
  //   cb(new AppError("Not an image! Please upload only images.", 400), false);
  // }
};
