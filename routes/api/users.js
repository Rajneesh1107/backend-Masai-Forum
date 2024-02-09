const {
  getUsers,
  createUser,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../../controller/users.controller");
const { userLogin, userLogout } = require("../../controller/auth.controller");
const { auth } = require("../../middleware/auth.middleware");

module.exports = (app) => {
  app.get("/users", getUsers);
  app.get("/user/:id", getUserDetails);
  app.post("/user/register", createUser);
  app.post("/user/login", userLogin);
  app.get("/user/logout", userLogout);
  app.patch("/user/:id", auth, updateUser);
  app.delete("/user/:id", auth, deleteUser);
};
