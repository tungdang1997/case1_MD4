import {Schema, model} from "mongoose";

const orderSchema = new Schema({

    customer: {
        type: String, ref: 'User'
    },


    products: {
        type: String,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1,
    },


    address: {
        type: String,
        required: [true, "address can't be blank"]
    },

    phone: {
        type: String,
        required: [true, "address can't be blank"]
    },

    orderDate: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: String,
        default: "Đang xử lý",
        enum: ["Đang xử lý", "Đang giao", "Hoàn tất", "Đã hủy"]
    },

    note: String,

})

const Order = model('Order', orderSchema);
export {Order};
