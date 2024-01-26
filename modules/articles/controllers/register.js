const slugify = require("slugify");
const Article = require("../../../models/article.model");

const register = async (req, res) => {
  const { title, body, category } = req.body;

  if (!title) {
    return;
  }

  try {
    await Article.create({
      title,
      body,
      categoryId: category,
      slug: slugify(title.toLowerCase()),
    });

    res.redirect("/admin/articles/page/1");
  } catch (error) {
    console.log("error register articles ------>");
    console.log(error);
    res.redirect("/admin/articles/page/1");
  }
};

module.exports = register;
