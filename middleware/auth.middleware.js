const { verifyToken } = require("../lib/helper/common");
const { http } = require("../lib/helper/const");
const { logoutModel } = require("../models/blacklist.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1].trim();

  try {
    let isLogout = await logoutModel.findOne({ token });
    if (isLogout) {
      res.status(http.UNAUTHORIZED).send({ msg: "please login again" });
    }
    let decode = verifyToken(token);

    if (decode.id == req.params.id) {
      next();
    } else {
      res.status(http.UNAUTHORIZED).send({ msg: "you are not authorised" });
    }
  } catch (error) {
    res
      .status(http.UNAUTHORIZED)
      .send({ msg: "you need to login first", error });
  }
};

module.exports = { auth };
