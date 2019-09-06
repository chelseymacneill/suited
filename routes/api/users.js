const mongoose = require('mongoose');
const auth = require('../auth');
const Users = mongoose.model('Users');

const router = require('express').Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usersController = require("../../controllers/usersController");



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

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

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


///////////////////QUIZ 
router.post("/quiz", auth.optional, (req, res, next) => {
  console.log("CREATE USER QUIZ: ", req.body)

  Users.updateOne({ _id: req.body.id }, 
    { $set: 
      { 
            // quiz: req.body.quiz
            g: req.body.g,
            y: req.body.y,
            r: req.body.r
                // {text: req.body.text} 
        } 
    })
    .then(dbJob => res.json(dbJob))
    .catch(err => res.status(422).json(err));
})
// })
// .post(usersController.updateQuiz);

module.exports = router;