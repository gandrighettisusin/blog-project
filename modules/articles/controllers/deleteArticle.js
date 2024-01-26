const Article = require("../../../models/article.model");

const deleteArticle = async (req, res) => {
  const { article_id } = req.params;

  if (!article_id) {
    res.redirect("/admin/articles");
  }

  if (isNaN(article_id)) {
    res.redirect("/admin/articles");
  }

  try {
    await Article.destroy({
      where: {
        id: article_id,
      },
    });

    res.redirect("/admin/articles/page/1");
  } catch (error) {
    console.log("error delete articles ------>");
    console.log(error);
  }
};

module.exports = deleteArticle;
