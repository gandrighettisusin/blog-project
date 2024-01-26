const Article = require("../../../models/article.model");
const Category = require("../../../models/category.model");

const get = async (req, res) => {
  try {
    const { num } = req.params;
    const limit = 10;
    let offset = 0;
    let next = true;

    if (isNaN(num) || parseInt(num) === 1) {
      offset = 0;
    } else {
      offset = (parseInt(num)-1) * 15;
    }

    const articles = await Article.findAndCountAll({
      limit: limit * parseInt(num),
      offset: ((parseInt(num) - 1) * limit),
      include: [{ model: Category }],
    });

    if (offset + limit >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    res.render("admin/articles/list", {
      page: parseInt(num),
      articles: articles.rows,
      next: next 
    });
  } catch (error) {
    console.log("error get articles ------>");
    console.log(error);
  }
};

module.exports = get;
