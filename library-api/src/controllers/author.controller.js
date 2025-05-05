const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los autores",
      detalle: error.message,
    });
  }
}
const getAuthorById = async (req, res) => {
  try {
    const idAuthor = parseInt(req.params.id);
    const author = await Author.findOne({ id: idAuthor });
    if (!author) {
      return res.status(404).json({ error: "Autor no existente" });
    }
    res.json(author);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener el autor",
        detalle: error.message,
      });
  }
};

const createAuthor = async (req, res) => {
  try {
    const {
      nombre,
      bio,
      fechaNacimiento,
      nacionalidad,
      libros,
    } = req.body;

    if (!nombre || !fecha || !nacionalidad || !disponible) {
      return res.status(400).json({ message: "Faltan campos requeridos." });
    }

    const newAuthor = new Author({
      nombre,
      bio,
      fechaNacimiento,
      nacionalidad,
      libros: libros || [],
    });

    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el autor",
      detalle: error.message,
    });
  }
};

const editAuthor = async (req, res) => {
  try {
    const idAuthor = parseInt(req.params.id);
    const updates = req.body;
    const updatedAuthor = await Book.findOneAndUpdate(
      { id: idAuthor },
      updates,
      {
        new: true,
      }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al editar el autor", detalle: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const idAuthor = parseInt(req.params.id);
    const deletedAuthor = await Author.findOneAndDelete({ id: idAuthor });
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }
    res.status(200).json({ message: "Autor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el autor",
      detalle: error.message,
    });
  }
};

const addBookToAuthor = async (req, res) => {
  try {
    const authortId = parseInt(req.params.id);
    const bookId = req.params.researcherId;
    const author = await Author.findOne({ id: authortId });
    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    const alreadyAssigned = autor.book.includes(bookId);
    if (alreadyAssigned) {
      return res
        .status(400)
        .json({ message: "El libro ya esta asignado al autor" });
    }

    author.book.push(bookId);
    await author.save();
    res
      .status(200)
      .json({ message: "Libro asignado al autor", author });
  } catch (error) {
    res.status(500).json({
      message: "Error al asignar libro",
      detalle: error.message,
    });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  editAuthor,
  deleteAuthor,
  addBookToAuthor,
}