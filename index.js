const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URI;
const multer = require("multer");
const path = require("path");
const User = require("./models/usersModel");

app.use(
  cors({
    origin: ["https://quick2qr.netlify.app", "http://localhost:5173"],
  })
);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("file"); // Update the field name here

app.post("/upload/:id", async (req, res) => {
  upload(req, res, async (err) => {
    const id = req.params.id;
    console.log(id);

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.profilePicture = req.file ? req.file.path : null;
      await user.save();
      return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  });
});

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
app.use("/uploads", express.static("uploads"));
