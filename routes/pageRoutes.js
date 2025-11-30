const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/form.html"));
});

router.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/list.html"));
});

module.exports = router;
