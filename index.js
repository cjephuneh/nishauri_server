const express = require("express");
const ussdRoute = require("./ussd");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//calling Database function
require("./config/database").connect();

//route importing and mounting

app.listen(PORT, () => console.log(`running on localhost:${PORT}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", ussdRoute);

// const userRoutes = require("./routes/user");
// app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});





