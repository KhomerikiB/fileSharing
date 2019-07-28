const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const routeIndex = require("./routes/routeIndex");

//old one // mongodb+srv:admin:Zxer5667@cluster0-ewsr3.mongodb.net/test?retryWrites=true&w=majority
// Initial Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("Connected to DATABASE");
});
mongoose.set("useCreateIndex", true);
app.use(express.static("public"));
app.get("/download/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Custom API routes
app.use("/api", routeIndex);

// Initial server
const PORT = process.env.PORT || 5001;
app.listen(PORT, err => {
  console.log("Connected to PORT " + PORT);
});
