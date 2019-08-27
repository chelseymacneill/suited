const mongoose = require('mongoose');
const auth = require('../auth');
const Users = mongoose.model('Users');

const router = require('express').Router();
const passport = require('passport');

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

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .then(console.log("signup")
    );
});

//POST login route (optional, everyone has access)
//After that, we are going to create another optional auth route ‘/login’ . This will be used to activate our passport configuration and validate a received password with email.
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  console.log('routes/user.js, login, req.body: ', req.body);
  
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

  // passport.authenticate('local', { failureRedirect: '/login' }),
  // function(req, res) {
  //   // res.redirect('/');
  //   console.log("login!", req)
  // }
  //////////////////////////////////
  // passport.authenticate('local'),
  //   (req, res) => {
  //       console.log('logged in', req.user);
  //       var userInfo = {
  //           username: req.user.username
  //       };
  //       res.send(userInfo);
  //   }
  ///////////////////////////////////
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      console.log("USER TOKEN", user.token);
      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.optional, (req, res, next) => {
  // const { payload: { id } } = req;

  // // console.log(id, req.headers);
  // return Users.findById(id)
  //   .then((user) => {
  //     if(!user) {
  //       return res.sendStatus(400);
  //     }
  //     console.log("current user", user)
  //     return res.json({ user: user.toAuthJSON() });
  //   });
  console.log("current user")
});

router.post('/logout', auth.required, (req, res, next) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})

router.get("/test", auth.optional, (req, res, next) => {
  // const { body: { user } } = req;
  console.log("users test");
});


module.exports = router;