const router = require('express').Router();
const productController = require('../controllers/products.controller');
const upload = require('../utils/imageUpload');



router.post(`/create`, upload.uploadImage, productController.createProduct);
router.put(`/upload-images/:id`, upload.uploadMultipleImages, productController.uploadImages);
router.get(`/all`, productController.products);
router.get(`/:id`, productController.product);
router.put(`/update/:id`, upload.uploadImage, productController.updateProduct);
router.delete(`/delete/:id`, productController.deleteProduct);
// router.get(`/create`, async (req, res) => {
//   try {
//     res.sendStatus(200);
//   } catch(error) {
//     console.log(error);
//   }
// });

module.exports = router;
