const loadCommentsBtnElement = document.getElementById('load-comments-btn');

const fetchCommentsForPost = () => {
  fetch('/posts/.../comments');
};

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
