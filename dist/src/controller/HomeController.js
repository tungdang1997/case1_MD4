"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const ProductService_2 = __importDefault(require("../service/ProductService"));
class HomeController {
    constructor() {
        this.showHome = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            console.log(products);
            res.render('home', { products: products });
        };
        this.showHomeUser = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            res.render('homeUser', { products: products });
        };
        this.showFormDetail = async (req, res) => {
            let product = await ProductService_1.default.findById(req.params.id);
            res.render('products/detail', { products: product });
        };
        this.search = async (req, res) => {
            let search = req.body;
            let products = await ProductService_2.default.findByName(search);
            res.render('homeUser', { products: products });
        };
        this.showFormCreate = async (req, res) => {
            let categories = await this.categoryService.getAll();
            res.render('products/create', { categories: categories });
        };
        this.create = async (req, res) => {
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await ProductService_1.default.save(product);
                    res.redirect(301, '/home');
                }
            }
        };
        this.showFormEdit = async (req, res) => {
            let id = req.params.id;
            let product = await this.productService.findById(id);
            let categories = await this.categoryService.getAll();
            res.render('products/edit', { products: product, categories: categories });
        };
        this.updateProduct = async (req, res) => {
            let id = req.params.id;
            console.log(id);
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await this.productService.update(id, product);
                    res.redirect(301, '/home');
                }
            }
        };
        this.removeProduct = async (req, res) => {
            let id = req.params.id;
            let product = await this.productService.remove(id);
            res.redirect(301, '/home');
        };
        this.showFormRemove = async (req, res) => {
            let id = req.params.id;
            res.render('products/delete', { id: id });
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map