import express from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from './routes/BooksRoutes.js';

const app = express();

// Middlewre for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the MERN Stack Book Project");
});

app.use('/book', bookRoutes);

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
