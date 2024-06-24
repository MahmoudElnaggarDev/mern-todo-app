const mongoose = require("mongoose");
const express = require("express");
const app = express();
const todoRouter = require("./routes/todoRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
const port = process.env.PORT;
const monog_uri = process.env.MONGO_URI;

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);

mongoose
  .connect(monog_uri)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
