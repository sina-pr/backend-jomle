const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoute = require("./src/api/posts/routes");
const userRoute = require("./src/api/users/routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const db_url = process.env.DB_URL;
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

app.get("*", (req, res) => {
  res.send("HELLO WORLD!");
});

app.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});
