const bcrypt = require("bcryptjs");
const User = require("../../../models/user.model");

const register = async (req, res) => {
  const { full_name, email, password, password_confirmation } = req.body;

  if (!full_name || !email) {
    return;
  }

  if (!password !== !password_confirmation) {
    return;
  }

  try {
    const usedEmail = await User.findOne({
      where: { email },
    });

    if (usedEmail) {
      res.redirect("/admin/users/new");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({
      full_name,
      email,
      password: hashedPassword,
    });

    res.redirect("/admin/users/new");
  } catch (error) {
    console.log("error register user ------>");
    console.log(error);
    res.redirect("/admin/users/new");
  }
};

module.exports = register;
