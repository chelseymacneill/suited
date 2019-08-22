const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
// const db = require("../models");
// const User = db.User;

//POST new user route (optional, everyone has access)
//First, we are going to create an optional auth route ‘/’ which will be used for new model creation (register).
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  // if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
  //   errors.password = "Password must be at least 6 characters";
  // }
  if(user.password.length < 6 || user.password.length > 30) {
    return res.status(422).json({
      errors: {
        password: 'must be beetween 6 and 30 characters'
      }
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
//After that, we are going to create another optional auth route ‘/login’ . This will be used to activate our passport configuration and validate a received password with email.
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      console.log(user.token);
      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
//Lastly, we will create a required auth route, which will be used to return the currently logged in user. Only logged in users (users that have their token successfully sent through request’s headers) have access to this route.
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  // console.log(id, req.headers);
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      console.log(user)
      return res.json({ user: user.toAuthJSON() });
    });
});

router.get("/test", auth.optional, (req, res, next) => {
  // const { body: { user } } = req;
  console.log("users test");
});


module.exports = router;