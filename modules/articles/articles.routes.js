const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const get = require("./controllers/get");
const register = require("./controllers/register");
const newArticle = require("./controllers/newArticle");
const edit = require("./controllers/edit");
const updateArticle = require("./controllers/updateArticle");
const deleteArticle = require("./controllers/deleteArticle");

router.get("/articles", (req, res) => {});

router.post("/articles/save", auth, register);
router.get("/admin/articles/page/:num", auth, get);
router.get("/admin/articles/new", auth, newArticle);
router.get("/admin/articles/edit/:article_id", auth, edit);
router.post("/articles/update", auth, updateArticle);
router.post("/admin/articles/delete/:article_id", auth, deleteArticle);

module.exports = router;
