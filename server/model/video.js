import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrlID: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: ["chest", "shoulders", "back", "legs", "core"],
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("video", videoSchema);
export default Video;
