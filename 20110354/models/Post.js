class Post {
  constructor(id, title, content, comments = []) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = comments;
  }
}

module.exports = Post;
