const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  const { id } = req.params;

  Users.update(id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    })
});

router.delete('/:id', validateUserId, (req, res, next) => {
  const { id } = req.params;
  
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
      return Users.remove(id);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  const { id } = req.params;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      next(err);
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const { id } = req.params;
  Posts.insert({ user_id: id, text: req.text })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      next(err);
    })
});

// do not forget to export the router
module.exports = router;