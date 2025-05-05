const Book = require("../models/Book.model");
const Author = require("../models/Author.model")
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los libros",
      detalle: error.message,
    });
  }
}

const getBookById = async (req, res) => {
  try {
    const idBook = parseInt(req.params.id);
    const book = await Book.findOne({ id: idBook });
    if (!book) {
      return res.status(404).json({ error: "Libro no existente" });
    }
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener el libro",
        detalle: error.message,
      });
  }
};

const createBook = async (req, res) => {
  try {
    const {
      titulo,
      resumen,
      genero,
      fechaPublicacion,
      disponible
    } = req.body;

    if (!titulo || !genero || !fechaPublicacion || disponible === undefined)
      {
      return res.status(400).json({ message: "Faltan campos requeridos." });
    }

    const newBook = new Book({
      titulo,
      resumen,
      genero,
      fechaPublicacion,
      disponible,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el libro",
      detalle: error.message,
    });
  }
};

const editBook = async (req, res) => {
  try {
    const idBook = parseInt(req.params.id);
    const updates = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { id: idBook },
      updates,
      {
        new: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al editar el libro", detalle: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const idBook = parseInt(req.params.id);
    const authorAssigned = await Author.findOne({ bookId: idBook });
    if (authorAssigned) {
      return res.status(400).json({
        message: "No se puede eliminar el libro porque está asignado a un autor",
      });
    }

    const deletedBook = await Book.findOneAndDelete({ id: idBook });
    if (!deletedBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el libro",
      detalle: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  editBook,
  deleteBook,
};