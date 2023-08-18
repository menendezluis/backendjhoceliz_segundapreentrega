import mongoose from "mongoose";

const cartCollection = "carts";

const CartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: String,
            quantity: Number
        }]
    }
})

const CartModel = mongoose.model(cartCollection, CartSchema );


export default CartModel;