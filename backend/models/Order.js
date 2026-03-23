const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true
  }, 
  
   

  items: [
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
