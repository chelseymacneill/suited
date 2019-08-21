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
    }
};
