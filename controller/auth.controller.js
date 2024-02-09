const { http } = require("../lib/helper/const");
const userModel = require("../models/user.model");
const { isPasswordCorrect, generateToken } = require("../lib/helper/common");
const { logoutModel } = require("../models/blacklist.model");
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(http.NOT_FOUND)
        .send({ error: "user is not registered \n please create account" });
    }

    const isPasswordMatched = isPasswordCorrect(password, user.password);
    if (!isPasswordMatched) {
      res.status(http.BAD_REQUEST).send({ error: "password is not matched" });
    }

    const token = generateToken(user.id, user.username);
    res.status(http.OK).send({ msg: "login success", token });
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ error });
  }
};

exports.userLogout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1].trim();

  try {
    if (token) {
      const logout = await new logoutModel({ token });
      logout.save();
      res.status(http.OK).send({ msg: "user is logged out" });
    }
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ error });
  }
};
