const loadCommentsBtnElement = document.getElementById('load-comments-btn');

const fetchCommentsForPost = () => {
  const postId = loadCommentsBtnElement.dataset.postid;
  fetch(`/posts/${postId}/comments`);
};

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
