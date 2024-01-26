const slugify = require("slugify");
const Category = require("../../../models/category.model");

const register = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return;
  }

  try {
    await Category.create({
      title,
      slug: slugify(title.toLowerCase()),
    });

    res.redirect("/admin/categories");
  } catch (error) {
    console.log("error register categories ------>");
    console.log(error);
    res.redirect("/admin/categories");
  }
};

module.exports = register;
