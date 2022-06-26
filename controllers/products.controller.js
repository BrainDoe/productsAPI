const multer = require('multer')
const ErrorResponse = require('../utils/errorResponse');
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');



// FILE UPLOADS
// const FILE_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpeg'
// }


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       const isValid = FILE_TYPE_MAP[file.mimetype];
//       let uploadError = new Error('invalid image type');

//       if (isValid) {
//           uploadError = null;
//       }
//       cb(uploadError, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//       let fileName = file.originalname.split(' ').join('-');
//       fileName = fileName.split('.')[0]
//       const extension = FILE_TYPE_MAP[file.mimetype];
//       cb(null, `${fileName}-${Date.now()}.${extension}`);
//   }
// });

// const uploadOptions = multer({ storage: storage })

// GET ALL PRODUCTS
exports.products = async (req, res, next) => {
  try {
    let filter = {}
    if(req.query.categories) {
      filter = {category: req.query.categories.split(',')}
    }
    const products = await Product.find(filter);
    
    return res.status(200).json({
      status: 'success',
      data: products
    })
  } catch(error) {
    res.status(400).json({
      status: 'fail',
      data: null
    })
  }
}

// POST A PRODUCT
exports.createProduct = async (req, res, next) => {
  const {name, description, price, category, countInStock} = req.body
  try {
    // Validate file upload
    const file = req.file
    // console.log(req.file);
    if(!file) {
      return next(new ErrorResponse("Invalid request. Please ensure there is an image in the product you are posting", 400));
    }

    // Image file path and file name
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = await Product.create({
      name,
      description,
      image: `${basePath}${fileName}`, // http://localhost:3000/public/uploads/image-223434.jpeg
      price,
      category,
      countInStock
    });

    return res.status(200).json({
      status: 'success',
      data: product
    })
  } catch (error) {
    next(error);
  }
}

// GET A SINGLE PRODUCT
exports.product = async (req, res, next) => {
  const {id} = req.params;
  try {
    // const product = await Product.findById(req.params.id).populate('category')
    const product = await Product.findById({_id: id});
    return res.status(200).json({
      status: 'success', 
      data: product
    })
  }catch(error) {
    return res.status(500).json({
      status: 'fail',
      data: null
    })
  }
}

// UPDATE A PRODUCT
exports.updateProduct = async (req, res, next) => {
  const {name, description, price, category, countInStock} = req.body;
  try {
    if(!req.params.id) {
      return next(new ErrorResponse("Please provide a valid id", 400));
    }
    
    const product = await Product.findById(req.params.id)
    if(!product) {
      return next(new ErrorResponse("Product does not exist", 400));
    }

    const file = req.file
    let imagepath

    if(file) {
      const fileName = file.filename
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
      imagepath = `${basePath}${fileName}`
    } else {
      imagepath = product.image
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
      {
        name,
        description,
        image: imagepath, // http://localhost:3000/public/uploads/image-223434
        price,
        category,
        countInStock,
      },  
      {new: true});

    return res.status(201).json({
      status: 'success',
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
}


// DELETE A PRODUCT
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    await Product.findByIdAndDelete({_id: id});
    
    return res.status(200).json({
      status: 'success',
      message: 'product deleted',
      data: {}
    })
  } catch(error) {
    res.status(400).json({ 
      status: 'fail',
      data: null
     })
  }
}

exports.uploadImages = async (req, res, next) => {
  try {
    const files = req.files
    let imagePaths = []
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

    if(files) {
      files.map(file => imagePaths.push(`${basePath}${file.filename}`))
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {images: imagePaths}, {new: true})

    return res.status(201).json({
      status: 'success',
      data: updatedProduct
    })
  } catch (error) {
    next(error);
  }
}


