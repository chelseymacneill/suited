const db = require("../models");

module.exports = {
    //post new user route
    create: function(req, res) {
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
          .then(() => res.json({ user: finalUser.toAuthJSON() }));

        // db.User.create(req.body)
    },

    updateQuiz: function (req, res) {
      console.log("CREATE USER QUIZ: ", req.body)
      // db.Users.updateOne({ _id: req.body.id }, req.body )
      // .then(dbUser => res.json(dbUser))
      // .catch(err => res.status(422).json(err));
      // db.UserJob.updateOne({ _id: req.body.id }, 
      //   { $set: 
      //     { 
      //           // quiz: req.body.quiz
      //           $each: {g: [req.body.g]},
      //           $each: {y: [req.body.y]},
      //           $each: {r: [req.body.r]}
      //               // {text: req.body.text} 
      //       } 
      //   })

      db.Users.updateOne({ _id: req.body.id }, 
        { $set: 
          { 
                // quiz: req.body.quiz
                g: { $each:[req.body.g]},
                y: { $each:[req.body.y]},
                r: { $each:[req.body.r]}
                    // {text: req.body.text} 
            } 
        })
        .then(dbJob => res.json(dbJob))
        .catch(err => res.status(422).json(err));
    },
    // update: function (req, res) {
    //   db.User.updateOne({ _id: req.body.id }, req.body )
    //       .then(dbJob => res.json(dbJob))
    //       .catch(err => res.status(422).json(err));
    // }
    findAll: function (req, res) {
      db.UserJob.find(req.body)
          .then(dbJob => res.json(dbJob))
          .catch(err => res.status(422).json(err));
  },
};
