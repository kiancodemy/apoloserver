import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "no description",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity must be at least 0"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price must be at least 0"],
    },
    image: {
      type: String,
      default: "image",
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
