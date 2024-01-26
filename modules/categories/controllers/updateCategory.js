const slugify = require("slugify");
const Category = require("../../../models/category.model");

const updateCategory = async (req, res) => {
  const { id, title, slug } = req.body;

  if (!title) {
    return;
  }

  try {
    await Category.update(
      {
        title,
        slug: slug ? slug : slugify(title.toLowerCase()),
      },
      {
        where: {
          id,
        },
      }
    );

    res.redirect("/admin/categories");
  } catch (error) {
    console.log("error updateCategory categories ------>");
    console.log(error);
    res.redirect("/admin/categories");
  }
};

module.exports = updateCategory;
