const multer = require('multer');


// FILE UPLOADS
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if (isValid) {
        uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname.split(' ').join('-');
    fileName = fileName.split('.')[0]
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
});

const uploadOptions = multer({ storage: storage });

const upload = uploadOptions;
exports.uploadImage = upload.single('image');

exports.uploadMultipleImages = upload.array('images');