const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.findById(id)
    .then(result => {
      if (result === null || result === undefined) {
        res.status(404).json({ message: "user not found" }  );
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
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