const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const register = require("./controllers/register");
const get = require("./controllers/get");
const edit = require("./controllers/edit");
const deleteCategory = require("./controllers/deleteCategory");
const updateCategory = require("./controllers/updateCategory");

router.get("/categories", auth, (req, res) => {});

router.get("/admin/categories/new", auth, (req, res) => {
  res.render("admin/categories/new");
});

router.get("/admin/categories", auth, get);
router.post("/categories/save", auth, register);
router.get("/admin/categories/edit/:category_id", auth, edit);
router.post("/categories/update", auth, updateCategory);
router.post("/admin/categories/delete/:category_id", auth, deleteCategory);

module.exports = router;
