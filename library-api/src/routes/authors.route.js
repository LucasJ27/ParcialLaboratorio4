const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller")

router.get("/authors", authorController.getAllAuthors);
router.get("/authors/:id", authorController.getAuthorById);
router.post("/authors", authorController.createAuthor);
router.put("/authors/:id", authorController.editAuthor);
router.delete("/authors/:id", authorController.deleteAuthor);
router.put(
  "/authors/:id/addBook/:bookId",
  authorController.addBookToAuthor
);


module.exports = router;