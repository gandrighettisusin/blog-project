const bcrypt = require("bcryptjs");
const User = require("../../../models/user.model");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return;
  }

  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        const passwordMatches = bcrypt.compareSync(password, user.password);

        if (passwordMatches) {
          req.session.user = {
            id: user.id,
            email: user.email,
          };
          res.json(req.session);
        } else {
          res.redirect("/admin/login");
        }
      }
    })
    .catch((error) => {
      console.log("Error login-----", error);
      res.redirect("/admin/login");
    });
};

module.exports = login;
