const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String, 
    require: true
  },
  image: {
    type: String
  },
  images: [String],
  price: {
    type: String, 
    default: 'Free'
  },
  shippingPrice: {
    type: Number,
    default: 0
  }
}, {timestamps: true});


module.exports = mongoose.model('Product', productSchema)