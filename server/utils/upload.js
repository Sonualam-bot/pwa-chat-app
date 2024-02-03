import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.CONNECTION_URL,

  file: (request, file) => {
    const imageMimeTypes = ["image/png", "image/jpg"];
    const videoMimeTypes = ["video/mp4", "video/webm", "video/quicktime"];
    const audioMimeTypes = ["audio/*"];

    if (imageMimeTypes.indexOf(file.mimetype) !== -1) {
      return {
        bucketName: "fs",
        filename: `${Date.now()}-blog-${file.originalname}`,
      };
    } else if (videoMimeTypes.indexOf(file.mimetype) !== -1) {
      return {
        bucketName: "fs",
        filename: `${Date.now()}-blog-${file.originalname}`,
      };
    } else if (audioMimeTypes.indexOf(file.mimetype) !== -1) {
      return {
        bucketName: "fs",
        filename: `${Date.now()}-blog-${file.originalname}`,
      };
    } else {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    // if (match.indexOf(file.mimetype) === -1)
    //   return `${Date.now()}-blog-${file.originalname}`;

    // return {
    //   bucketName: "fs",
    //   filename: `${Date.now()}-blog-${file.originalname}`,
    // };
  },
});

export default multer({ storage });
