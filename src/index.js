const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const { MONGO_URI } = require("./config/dbConfig");

const setupAndStartServer = async () => {
  const app = express();
  //middlewares
  app.use(cors());
  app.use(bodyParser.json());
  //   app.use("/api", apiRoutes);
  //mongodb connection
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: ", err));

  //server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupAndStartServer();
