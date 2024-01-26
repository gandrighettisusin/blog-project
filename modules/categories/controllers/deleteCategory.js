const Category = require("../../../models/category.model");

const deleteCategory = async (req, res) => {
  const { category_id } = req.params;

  if (!category_id) {
    res.redirect("/admin/categories");
  }

  if (isNaN(category_id)) {
    res.redirect("/admin/categories");
  }

  try {
    await Category.destroy({
      where: {
        id: category_id,
      },
    });

    res.redirect("/admin/categories");
  } catch (error) {
    console.log("error delete categories ------>");
    console.log(error);
  }
};

module.exports = deleteCategory;
