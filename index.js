import express from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the MERN Stack Book Project");
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
