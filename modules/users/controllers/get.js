const User = require("../../../models/user.model");

const get = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("admin/users/list", { users: users });
  } catch (error) {
    console.log("error get users ------>");
    console.log(error);
  }
};

module.exports = get;
