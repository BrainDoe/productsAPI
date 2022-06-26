const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String, 
    require: true
  },
  description: {
    type: String, 
    require: true
  },
  category: {
    type: String, 
    require: true
  },
  image: {
    type: String, 
    require: true
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
  },
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category', 
  //   require: true
  // },
  countInStock: {
    type: Number, 
    require: true
  }
}, {timestamps: true});


module.exports = mongoose.model('Product', productSchema)