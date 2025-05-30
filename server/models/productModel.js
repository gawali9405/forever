import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type:Array,
        required: true
    },
    bestSeller: {
        type: Boolean,
        default: false
    },
    date:{
        type:Number,
        required:true
    }
},{
    timestamps: true
})

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
