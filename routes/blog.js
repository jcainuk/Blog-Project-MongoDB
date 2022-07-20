const express = require('express');
const mongodb = require('mongodb');

const db = require('../data/database');

const { ObjectId } = mongodb;

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/posts', async (req, res) => {
  const posts = await db.getDB().collection('posts').find({})
    .project({ title: 1, summary: 1, 'author.name': 1 })
    .toArray();

  // eslint-disable-next-line object-shorthand
  res.render('posts-list', { posts: posts });
});

router.get('/new-post', async (req, res) => {
  const authors = await db.getDB().collection('authors').find().toArray();

  // eslint-disable-next-line object-shorthand
  res.render('create-post', { authors: authors });
});

router.post('/posts', async (req, res) => {
  const authorId = new ObjectId(req.body.author);
  const author = await db.getDB().collection('authors').findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };
  const result = await db.getDB().collection('posts').insertOne(newPost);

  res.redirect('/posts');
});

router.get('/posts/:id', async (req, res, next) => {
  let postId = req.params.id;

  try {
    postId = new ObjectId(postId);
  } catch (error) {
    return next(error);
  }

  const post = await db
    .getDB()
    .collection('posts')
    .findOne({ _id: postId }, { summary: 0 });

  if (!post) {
    return res.status(404).render('404');
  }

  post.humanReadableDate = post.date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  post.date = post.date.toISOString();

  res.render('post-detail', { post });
});

router.get('/posts/:id/edit', async (req, res) => {
  const postId = req.params.id;
  const post = await db.getDB().collection('posts').findOne({ _id: new ObjectId(postId) }, { title: 1, summary: 1, body: 1 });

  if (!post) {
    return res.status(404).render('404');
  }

  // eslint-disable-next-line object-shorthand
  res.render('update-post', { post: post });
});

router.post('/posts/:id/edit', async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const result = await db.getDB().collection('posts').updateOne({ _id: postId }, {
    $set: {
      title: req.body.title, summary: req.body.summary, body: req.body.content, date: new Date(),
    },
  });

  res.redirect('/posts');
});

router.post('/posts/:id/delete', async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const result = await db.getDB().collection('posts').deleteOne({ _id: postId });
  res.redirect('/posts');
});

router.get('/posts/:id/comments', async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const post = await db.getDb().collection('posts').findOne({ _id: postId });
  const comments = await db
    .getDb()
    .collection('comments')
    .find({ postId }).toArray();

  return res.render('post-detail', { post, comments });
});

module.exports = router;
