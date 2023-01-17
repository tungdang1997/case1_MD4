"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const ProductService_1 = __importDefault(require("../service/ProductService"));
const UserService_2 = __importDefault(require("../service/UserService"));
class HomeController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            await this.userService.getAll();
            res.render('user/login');
        };
        this.showFormRegister = async (req, res) => {
            await this.userService.getAll();
            res.render('user/register');
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUser(req.body);
            if (user == null) {
                res.redirect('login');
            }
            if (user.username === 'admin') {
                req.session.User = user.id;
                res.redirect(301, '/home');
            }
            else {
                req.session.User = user.id;
                res.redirect(301, '/homeUser');
            }
        };
        this.register = async (req, res) => {
            let user = req.body;
            await UserService_1.default.save(user);
            res.redirect(301, "/users/login");
        };
        this.orderProduct = async (req, res) => {
            if (req.session.User) {
                let user = await this.userService.findById(req.session.User);
                let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User);
                res.redirect(301, '/homeUser');
            }
        };
        this.showFormCart = async (req, res) => {
            let cart = await UserService_1.default.findCartByUser(req.session.User);
            let sum = 0;
            for (let i = 0; i < cart.length; i++) {
                let products = await ProductService_1.default.findById(cart[i].product);
                sum += (cart[i].quantity * products.price);
            }
            res.render('D:\\untitled\\MD4\\src\\views\\user\\cart.ejs', { cart: cart, sum: sum });
        };
        this.payOrder = async (req, res) => {
            if (req.session.User) {
                await UserService_1.default.changeStatusCart(req.session.User);
                res.redirect(301, '/users/cart');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.deleteCart = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.userService.removeCart(id);
                res.redirect(301, '/users/cart');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.userService = UserService_2.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=UserController.js.map