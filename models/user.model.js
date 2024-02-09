const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please provide  username !"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide user email!"],
    },
    password: {
      type: String,
      required: [true, "Please provide user password!"],
    },
    avatar: { type: String, required: [true, "Please provide user avatar!"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
