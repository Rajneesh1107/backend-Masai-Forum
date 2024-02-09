require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.passwordValidator = (password) => {
  if (password.length < 8) {
    return false;
  }

  // Password should contain at least one capital letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Password should contain at least one number
  if (!/[0-9]/.test(password)) {
    return false;
  }

  // Password should contain at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }
  return true;
};

exports.hashedPassword = async (plainPassword, saltRound) => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  return hashedPassword;
};

exports.isPasswordCorrect = (plainPassword, hashedPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword);
  return result;
};

exports.generateToken = (id, username) => {
  const secreteKey = process.env.SECRETE_KEY;
  const token = jwt.sign({ id, username }, `${secreteKey}`, {
    expiresIn: "1d",
  });
  return token;
};

exports.verifyToken = (token) => {
  const secreteKey = process.env.SECRETE_KEY;
  let decode = jwt.verify(token, secreteKey);
  return decode;
};
