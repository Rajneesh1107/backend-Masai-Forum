const userModel = require("../models/user.model");
const { http } = require("../lib/helper/const");
const { passwordValidator, hashedPassword } = require("../lib/helper/common");

exports.getUsers = async (req, res) => {
  try {
    let users = await userModel.find({}, { email: 0, password: 0 });
    res
      .status(http.OK)
      .send({ msg: "get all users", usersCount: users.length, users });
  } catch (error) {
    res.status(http.INTERNAL_SERVER_ERROR).send({ msg: "Error", error });
  }
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    let users = await userModel.findById({ _id: id });
    res
      .status(http.OK)
      .send({ msg: "users details", usersCount: users.length, users });
  } catch (error) {
    res.status(http.INTERNAL_SERVER_ERROR).send({ msg: "Error", error });
  }
};

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      res
        .status(http.CONFLICT)
        .send({ msg: `user is already exist \n Please Login` });
    }

    // password validator
    if (!passwordValidator(password)) {
      res.status(http.BAD_REQUEST).send({
        msg: "Please create strong password",
        error:
          "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character",
      });
    }
    let userDetails = { ...req.body };
    userDetails.password = hashedPassword(userDetails.password, 5);

    const createUser = new userModel(userDetails);
    await createUser.save();
    res
      .status(http.CREATED)
      .send({ msg: "new user is created successfull", userDetails });
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ error: error, msg: "Failed" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updatDetails = req.body;
  try {
    const user = await userModel.findByIdAndUpdate({ _id: id }, updatDetails);

    user.save();
    if (!user) {
      res.status(http.NOT_FOUND).send({ msg: "user is not found " });
    } else {
      res.status(http.OK).send({ msg: "user details is updated", user });
    }
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ msg: error });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete({ _id: id });

    user.save();
    if (!user) {
      res.status(http.NOT_FOUND).send({ msg: "user is not found " });
    } else {
      res.status(http.OK).send({ msg: "user  is deleted", user });
    }
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ msg: error });
  }
};
