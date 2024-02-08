import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "https://chat-app-clone-server.onrender.com";

let gfs, gridFsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({
      message: "file not found",
    });
  }

  const imageUrl = `${url}/file/${req.file.filename}`;
  res.status(200).json({
    imageUrl,
  });
};

export const getMedia = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const readStream = gridFsBucket.openDownloadStream(file._id);

    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
