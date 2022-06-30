const router = require('express').Router();
const productController = require('../controllers/products.controller');
const upload = require('../utils/imageUpload');



router.post(`/create`, productController.createProduct);
router.put(`/upload-images/:id`, productController.uploadImages);
router.get(`/all`, productController.products);
router.get(`/:id`, productController.product);
router.put(`/update/:id`, productController.updateProduct);
router.delete(`/delete/:id`, productController.deleteProduct);


module.exports = router;
