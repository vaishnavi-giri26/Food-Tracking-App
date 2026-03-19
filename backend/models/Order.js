const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true
  }, 
  
   

  cartItems: [
    {
      id: Number,
      name: String,
      quantity: Number,
      price: Number, 
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Order", orderSchema);