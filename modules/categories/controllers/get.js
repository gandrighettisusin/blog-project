const Category = require("../../../models/category.model");

const get = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("admin/categories/list", { categories: categories });
  } catch (error) {
    console.log("error get categories ------>");
    console.log(error);
  }
};

module.exports = get;
