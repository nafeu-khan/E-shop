const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const user_routers = require("../routers/user_routers");
const cors = require("cors");
const product_routers = require("../routers/product_routers");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use('/upload', express.static('upload'));
app.use("/api/user", user_routers);
app.use("/api/product", product_routers);
app.get("/", (req, res) => {
  res.send({
    message: "hi",
  });
});

// error handing middleware
app.use((req, res, next) => {
  return res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

// error handing middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(200).send({
    success: false,
    message: err.message,
  });
});
module.exports = app;

// const multer = require("multer");
// //file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// module.exports = { upload };