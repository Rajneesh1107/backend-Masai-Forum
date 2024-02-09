const { verifyToken } = require("../lib/helper/common");
const { http } = require("../lib/helper/const");
const { logoutModel } = require("../models/blacklist.model");
const postModel = require("../models/post.model");

const deletePost = async (req, res, next) => {
  const {id} =req.params
  const token = req.headers.authorization.split(" ")[1].trim();

  try {
    let isLogout = await logoutModel.findOne({ token });
    if (isLogout) {
      res.status(http.UNAUTHORIZED).send({ msg: "please login again" });
    }
   
    let decode = verifyToken(token);
    
    let postDetails= await postModel.find({_id:id});
    if(postDetails.user_id==decode.id){
      next();
    }else {
      res.status(http.UNAUTHORIZED).send({ msg: "you are not authorised" });
    }
  } catch (error) {
    res
      .status(http.UNAUTHORIZED)
      .send({ msg: "you need to login first", error });
  }
};

module.exports = { deletePost };
