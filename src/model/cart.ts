import {Schema, model} from "mongoose";
export interface ICart{
    status?: string;
    quantity?: number;
    product?: string;
    users?: string
}
const cartSchema = new Schema({
    product: {
        type: String,
        ref: "Product",
    },
    quantity: Number,

    users: {
        type: String,
        ref: "User",
    },
    status: String

});

export const Cart = model<ICart>("Cart", cartSchema);
