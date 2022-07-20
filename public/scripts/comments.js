const loadCommentsBtnElement = document.getElementById('load-comments-btn');

const fetchCommentsForPost = async () => {
  const postId = loadCommentsBtnElement.dataset.postid;
  await fetch(`/posts/${postId}/comments`);
};

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
