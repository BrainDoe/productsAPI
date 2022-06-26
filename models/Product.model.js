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
    type: Number, 
    default: 0,
    required: true
  },
  shippingPrice: {
    type: Number,
    default: 0
  }
}, {timestamps: true});


module.exports = mongoose.model('Product', productSchema)