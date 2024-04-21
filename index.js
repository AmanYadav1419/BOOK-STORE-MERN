import express from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/BooksRoutes.js";
import cors from 'cors';
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origin with default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "https://ocalhost:3000",
    method: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the MERN Stack Book Project");
});

app.use("/book", bookRoutes);

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
