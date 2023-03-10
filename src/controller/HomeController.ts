import {Request, Response} from "express";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";

import ProductService from "../service/ProductService";
import CategoryService from "../service/CategoryService";


class HomeController {
    private productService;
    private categoryService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService
    }

    showHome = async (req, res: Response) => {
        let products = await productService.getAll();
        console.log(products)
        res.render('home', {products: products})
    }

    showHomeUser = async (req, res: Response) => {
        // // @ts-ignore
        // req.session.User
        let products = await productService.getAll();
        res.render('homeUser', {products: products})
    }


    showFormDetail = async (req: Request, res: Response) => {
        let product = await productService.findById(req.params.id);
        res.render('products/detail', { products: product });
    }

    search = async (req: Request, res: Response) => {
        let search = req.body;
        let products = await ProductService.findByName(search);
        res.render('homeUser', {products: products})
    }


    showFormCreate = async (req: Request, res: Response) => {
        let categories = await this.categoryService.getAll();
        res.render('products/create', {categories: categories});
    }



    create = async (req: Request, res: Response) => {
        if (req.files) {
            let image = req.files.image;
            if ('mv' in image) {
                await image.mv('./public/storage/' + image.name)
                let product = req.body;
                product.image = '/storage/' + image.name;
                await productService.save(product);
                res.redirect(301, '/home');
            }
        }
    }
    showFormEdit = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await this.productService.findById(id);
        let categories = await this.categoryService.getAll();
        res.render('products/edit', {products: product, categories : categories});

    }



    updateProduct = async (req, res: Response) => {
        let id = req.params.id;
        console.log(id)
        if (req.files) {
            let image = req.files.image;
            if ('mv' in image) {
                await image.mv('./public/storage/' + image.name)
                let product = req.body;
                product.image = '/storage/' + image.name;
                await this.productService.update(id, product);
                // console.log(await ProductService.update(id, product))
                res.redirect(301, '/home');
            }
        }
    }

    removeProduct = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await this.productService.remove(id);
        res.redirect(301, '/home');
    }

    showFormRemove = async (req: Request, res: Response) => {
        let id = req.params.id;
        res.render('products/delete', {id: id});
    }

}

export default new HomeController()