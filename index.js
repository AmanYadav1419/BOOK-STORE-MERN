import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the MERN Stack Book Project");
});

app.listen(PORT, () => {
  console.log(`App is running on Port: ${PORT}`);
});
