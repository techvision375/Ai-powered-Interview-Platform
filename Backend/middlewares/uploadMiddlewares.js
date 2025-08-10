import multer from "multer";

// configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // specify the destination folder
    }
    ,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // specify the file name
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // accept the file
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false); // reject the file
    }
};

// configure multer
const upload = multer({
    storage, fileFilter
 
});

//ES js syntax
export default upload;