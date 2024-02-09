const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Developer", "Design", "Innovation", "Tutorial", "Bussiness"],
    },
    content: { type: String, required: true },

    media: [{ type: String, required: true }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
      },
    ],
    created_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
