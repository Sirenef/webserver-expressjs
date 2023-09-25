const Post = require("../models/Post");

const posts = [];

exports.getPosts = (req, res) => {
  res.render("index", { posts });
};

exports.getPost = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    res.status(404).send("Bài viết không tồn tại.");
    return;
  }
  res.render("post", { post });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const postId = new Date().getTime().toString();
  const newPost = new Post(postId, title, content);
  posts.push(newPost);
  res.redirect("/");
};

exports.addComment = (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    res.status(404).send("Bài viết không tồn tại.");
    return;
  }
  post.comments.push(comment);
  res.redirect(`/post/${postId}`);
};

exports.getEditPost = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    res.status(404).send("Bài viết không tồn tại.");
    return;
  }
  res.render("edit-post", { post });
};

exports.updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    res.status(404).send("Bài viết không tồn tại.");
    return;
  }
  post.title = title;
  post.content = content;
  res.redirect(`/post/${postId}`);
};

exports.getDeletePost = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    res.status(404).send("Bài viết không tồn tại.");
    return;
  }
  res.render("delete-post", { post });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    res.status(404).send("Bài viết không tồn tại.");
    return;
  }
  posts.splice(postIndex, 1);
  res.redirect("/");
};
