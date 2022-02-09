const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then(result => {
      if (result === null || result === undefined) {
        res.status(404).json({ message: "user not found" }  );
      } else {
        req.user = result;
        next();
      }
    })
    .catch(err => {
      next(err);
    })
}

function validateUser(req, res, next) {
  const { name } = req.body;

  if (name === null || name === undefined) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};