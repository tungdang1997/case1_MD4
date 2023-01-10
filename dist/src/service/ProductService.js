"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let products = await product_1.Product.find();
            return products;
        };
        this.save = async (product) => {
            return product_1.Product.create(product);
        };
        this.findById = async (id) => {
            let product = await product_1.Product.findOne({ _id: id });
            return product;
        };
        this.update = async (id, newProduct) => {
            let product = await product_1.Product.findOne({ _id: id });
            if (!product) {
                return null;
            }
            return product_1.Product.updateOne({ _id: id }, newProduct);
        };
        this.remove = async (id, newProduct) => {
            let product = await product_1.Product.findOne({ _id: id });
            if (!product) {
                return null;
            }
            return product_1.Product.deleteOne({ _id: id });
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map