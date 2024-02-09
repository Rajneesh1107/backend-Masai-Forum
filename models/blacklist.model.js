const mongoose = require("mongoose");

const logoutSchema = mongoose.Schema(
  {
    token: { type: String, required: [true, "there is no token"] },
  },
  {
    versionKey: false,
  }
);
const blackListSchema = mongoose.Schema(
  {
    email: { type: String, required: [true, "there is no token"] },
  },
  {
    versionKey: false,
  }
);

const logoutModel = mongoose.model("logout", logoutSchema);
const blackListModel = mongoose.model("blackList", blackListSchema);

module.exports = {
  logoutModel,
  blackListModel,
};
