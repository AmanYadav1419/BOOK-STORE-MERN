import express from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middlewre for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the MERN Stack Book Project");
});

// Route for Save a new Book
app.post("/book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required feilds: title,author,publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(234).send(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books form database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for update a Book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required feilds: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated sucessfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for Delete Book
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURl)
  .then(() => {
    console.log("App Connected to database");
    app.listen(PORT, () => {
      console.log(`App is running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
