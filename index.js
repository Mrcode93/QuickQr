const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URI;
app.use(
  cors({
    origin: "https://quick2qr.netlify.app",
  })
);

// connect mongodb
mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());

app.use("/auth", require("./routes/useRoutes"));
app.use("/links", require("./routes/linksRoutes"));
