const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller")

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.createBook);
router.put("/books/:id", bookController.editBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;