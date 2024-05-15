const express = require("express");
const ussdRoutes = require("./ussd");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
//calling Database function
require("./config/database").connect();

//route importing and mounting
app.use("/af", ussdRoutes); // Use the imported router instance
app.use("/", ussdRoutes); // Use the imported router instance

// const userRoutes = require("./routes/user");
// app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});
