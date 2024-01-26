const Category = require("../../../models/category.model");

const newArticle = async (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
};

module.exports = newArticle;
