import {Request, Response} from "express";
import productService from "../service/ProductService";


class HomeController {
    private productService;

    constructor() {
        this.productService = productService;
    }

    showHome = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        res.render('home', {products: products})
    }
    showFormCreate = async (req: Request, res: Response) => {
        res.render('products/create');
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
        res.render('products/edit', {product: product});
    }

    updateProduct = async (req: Request, res: Response) => {
        let id = req.params.id;
        let newProduct = req.body;
        let product = await this.productService.update(id, newProduct);
        res.redirect(301, '/home');
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