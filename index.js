const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const userRoutes = require("./modules/users/users.routes");
const categoryRoutes = require("./modules/categories/categories.routes");
const articleRoutes = require("./modules/articles/articles.routes");
const connection = require("./database/database");

require("dotenv").config();

const app = express();

const Article = require("./models/article.model");
const Category = require("./models/category.model");
const User = require("./models/user.model");

// View engine
app.set("view engine", "ejs");

// Session
app.use(
  session({ secret: "haJqMN7KviPIqjnKVCA4", cookie: { maxAge: 300000 } })
);

// Static
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Connected with success!");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes (?)
app.use("/", articleRoutes);
app.use("/", categoryRoutes);
app.use("/", userRoutes);

// Refatorar urgentemente criando uma estrutura de
// rotas e controllers para as publicas também
app.get("/", (req, res) => {
  Article.findAll({
    limit: 5,
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", {
        articles: articles,
        categories: categories,
      });
    });
  });
});

app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article !== undefined && article !== null) {
        Category.findAll().then((categories) => {
          res.render(path.join(__dirname, "/views/public/article"), {
            article: article,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log("error on index", error);
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  const { slug } = req.params;
  Category.findOne({
    where: {
      slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (!category) {
        res.redirect("/");
      }

      Category.findAll().then((categories) => {
        res.render(path.join(__dirname, "/views/public/articlesCategory"), {
          articles: category.articles,
          categories: categories,
          category: category,
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

app.listen(8000, () => console.log("Server is running on 8000..."));
