const { http } = require("../lib/helper/const");
const postModel = require("../models/post.model");

exports.getPosts = async (req, res) => {
  let { page, limit, category, title } = req.query;
  try {
    let query = {};
    if (category) {
      query.category = category; //optional if category is given
    }
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 5;
    let skip = (page - 1) * limit;
    let allPosts = await postModel
      .find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    res.status(http.OK).send({
      msg: "get all posts",
      totalPosts: allPosts.length,
      allPosts,
    });
  } catch (error) {
    res.status(http.OK).send({ msg: "failed to get all posts" });
  }
};

exports.createPost = async (req, res) => {
  try {
    let post = await new postModel({ ...req.body });
    post.save();
    res
      .status(http.OK)
      .send({ msg: "Created a new post", post: { ...req.body } });
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ msg: "failed to post", error });
  }
};

exports.postDeleted = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      let deletedPost = await postModel.findByIdAndDelete({ _id: id });
      deletedPost.save();
      res.status(http.OK).send({ msg: "post deleted" });
    } else {
      res.status(http.NOT_FOUND).send({ msg: "post not found" });
    }
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ msg: error });
  }
};
