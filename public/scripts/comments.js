const loadCommentsBtnElement = document.getElementById('load-comments-btn');

const fetchCommentsForPost = async () => {
  const postId = loadCommentsBtnElement.dataset.postid;

  const response = await fetch(`/posts/${postId}/comments`);

  const data = await response.json();
};

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
