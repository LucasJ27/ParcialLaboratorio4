const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  nacionalidad: {
    type: String,
    required: true
  },
  libros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      default: [],
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;