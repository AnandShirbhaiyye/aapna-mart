import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity:{
        type: Number,
        default: 1,
    },
    shippingAddress:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "pending"
    }
});

const Order = model('Order', orderSchema);
export default Order;

