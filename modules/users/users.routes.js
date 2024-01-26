const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const register = require("./controllers/register");
const get = require("./controllers/get");
const login = require("./controllers/login");

router.get("/users", auth, (req, res) => {});

router.get("/admin/users/new", auth, (req, res) => {
  res.render("admin/users/new");
});

router.get("/admin/login", (req, res) => {
  res.render("admin/users/login");
});

router.get("/admin/users", auth, get);
router.post("/users/save", register);
router.post("/login", login);
router.get("/logout", auth, (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

module.exports = router;
