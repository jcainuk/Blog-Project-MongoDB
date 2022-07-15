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
  console.log(result);
  res.redirect('/posts');
});

router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await db.getDB().collection('posts').findOne({ _id: new ObjectId(postId) }, { summary: 0 });

  if (!post) {
    return res.status(404);
  }
  // eslint-disable-next-line object-shorthand
  res.render('post-detail', { post: post });
});

module.exports = router;
