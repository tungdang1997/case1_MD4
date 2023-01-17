import {Request, Response} from "express";
import userService from "../service/UserService";
import productService from "../service/ProductService";
import UserService from "../service/UserService";


class HomeController {
    private userService

    constructor() {
        this.userService = UserService
    }

    showFormLogin = async (req: Request, res: Response) => {
        await this.userService.getAll();
        res.render('user/login')
    }

    showFormRegister = async (req: Request, res: Response) => {
        await this.userService.getAll();
        res.render('user/register')
    }
    login = async (req, res: Response) => {
        let user = await this.userService.checkUser(req.body);
        if(user == null) {
            res.redirect('login')
        }
        if(user.username === 'admin'){
            req.session.User = user.id;
            res.redirect(301, '/home')
        }
        else {
            req.session.User = user.id;
            res.redirect(301, '/homeUser')
        }
    }

    register = async (req: Request, res: Response) => {
        let user = req.body;
        await userService.save(user);
        res.redirect(301, "/users/login");
    }

    orderProduct = async (req, res: Response) => {
        if (req.session.User){
            let user = await this.userService.findById(req.session.User);
            let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User);
            res.redirect(301, '/homeUser');
        }

    }

    showFormCart = async (req, res: Response) => {
        let cart = await userService.findCartByUser(req.session.User);
        let sum = 0;

        for (let i = 0; i < cart.length; i++) {
            let products = await productService.findById(cart[i].product);
            sum += (cart[i].quantity * products.price);
        }
        res.render('D:\\untitled\\MD4\\src\\views\\user\\cart.ejs', { cart: cart, sum: sum });
    }

    payOrder = async (req, res: Response) => {
        if (req.session.User) {
            await userService.changeStatusCart(req.session.User);
            res.redirect(301, '/users/cart');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteCart = async (req, res: Response) => {
        if (req.session.User) {
            let id = req.params.id
            await this.userService.removeCart(id);
            res.redirect(301, '/users/cart');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }


}

export default new HomeController();