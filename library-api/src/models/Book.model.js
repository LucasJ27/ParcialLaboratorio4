const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  resumen: {
    type: String,
  },
  genero: {
    type: String,
    required: true,
  },
  fechaPublicacion: {
    type: Date,
    required: true,
  },
  disponible: {
    type: Boolean,
    required: true,
  }

});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
