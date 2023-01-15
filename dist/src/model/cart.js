"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
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
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
//# sourceMappingURL=cart.js.map