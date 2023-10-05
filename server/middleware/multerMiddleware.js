const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4()+ "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  module.export = {storage,upload}