const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/posts', (req, res) => {
  res.render('posts-list');
});

router.get('/new-post', async (req, res) => {
  const authors = await db.getDB().collection('authors').find().toArray();

  // eslint-disable-next-line object-shorthand
  res.render('create-post', { authors: authors });
});

module.exports = router;
