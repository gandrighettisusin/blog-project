const slugify = require("slugify");
const Article = require("../../../models/article.model");
const Category = require("../../../models/category.model");

const updateArticle = async (req, res) => {
  const { id, title, slug, body, category } = req.body;

  if (!title) {
    return;
  }

  try {
    await Article.update(
      {
        title,
        body,
        categoryId: category,
        slug: slug ? slug : slugify(title.toLowerCase()),
      },
      {
        where: {
          id,
        },
      }
    );

    res.redirect("/admin/articles/page/1");
  } catch (error) {
    console.log("error updateArticle articles ------>");
    console.log(error);
    res.redirect("/admin/articles/page/1");
  }
};

module.exports = updateArticle;
