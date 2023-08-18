import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const ProductSchema = new mongoose.Schema({
        title: String,
        description: String,
        code: { type: Number, unique: true }, 
        price: Number,
        stock: Number,
        category: String,
        image: String ,
})

ProductSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model(productCollection, ProductSchema );


export default ProductModel;