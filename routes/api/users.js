const mongoose = require('mongoose');
const auth = require('../auth');
const Users = mongoose.model('Users');

const router = require('express').Router();
// const passport = require('passport');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

generateJWT = function(id, email) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: email,
    id: id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

toAuthJSON = function(id, email) {
  return {
    _id: id,
    email: email,
    token: generateJWT(id, email),
  };
};

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
  // const { payload: { id } } = req;

  console.log('routes/user.js, login, req/res: ', req.sessionID);
  
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
  console.log("current user pass", user.password)


  Users.find({ email: user.email })
    .then((userData) => {
      if(!userData) {
        return res.sendStatus(400);
      }
      const password = user.password;
      const salt = userData[0].salt;
      console.log("current user", userData[0]);
      
      const newHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
      
      //checking the password encription to see if it matches
      if (newHash === userData[0].hash) {
        console.log("success!!", userData[0]._id, userData[0].email)
        return res.json({ user: toAuthJSON(userData[0]._id, userData[0].email) })
      } else {
        return res.json()
      }
    });
});

//GET current route (required, only authenticated users have access)
// router.get('/current', auth.optional, (req, res, next) => {
  
//   console.log("current user")
// });

// router.post('/logout', auth.required, (req, res, next) => {
//   if (req.user) {
//       req.logout()
//       res.send({ msg: 'logging out' })
//   } else {
//       res.send({ msg: 'no user to log out' })
//   }
// })

module.exports = router;