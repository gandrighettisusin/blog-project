const Article = require("../../../models/article.model");
const Category = require("../../../models/category.model");

const edit = async (req, res) => {
  try {
    const { article_id } = req.params;

    if (!article_id) {
      res.redirect("/admin/articles");
    }

    if (isNaN(article_id)) {
      res.redirect("/admin/articles");
    }

    const article = await Article.findByPk(article_id, {
      include: [{ model: Category }],
    });

    const categories = await Category.findAll();
    res.render("admin/articles/edit", {
      article: article,
      categories: categories,
    });
  } catch (error) {
    console.log("error edit article ------>");
    console.log(error);
  }
};

module.exports = edit;
