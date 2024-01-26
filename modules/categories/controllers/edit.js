const Category = require("../../../models/category.model");

const edit = async (req, res) => {
  try {
    const { category_id } = req.params;

    if (!category_id) {
      res.redirect("/admin/categories");
    }

    if (isNaN(category_id)) {
      res.redirect("/admin/categories");
    }

    const category = await Category.findByPk(category_id);
    res.render("admin/categories/edit", { category: category });
  } catch (error) {
    console.log("error edit category ------>");
    console.log(error);
  }
};

module.exports = edit;
