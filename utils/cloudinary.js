// const cloudinary = require('cloudinary').v2;


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// module.exports = { cloudinary };


// app.post('/api/upload', async (req, res) => {
//   try {
//     const fileStr = req.body.image;
//     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: 'dev_setups'
//     });

//     console.log(uploadResponse);
//     res.status(200).json(uploadResponse);
//   } catch (error) {
//     console.error(error);
//   }
// })