const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const blogController = require("./controllers/blogController");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", blogController.getPosts);
app.get("/post/:id", blogController.getPost);
app.post("/create", blogController.createPost);
app.post("/comment/:id", blogController.addComment);
app.get("/edit/:id", blogController.getEditPost);
app.post("/update/:id", blogController.updatePost);
app.get("/delete/:id", blogController.getDeletePost);
app.post("/delete/:id", blogController.deletePost);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
