const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const capsuleRoutes = require("./routes/capsuleRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/capsule", capsuleRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(
        `Server Running on Port ${PORT}`
      );
    });

  })
  .catch((err) => console.log(err));