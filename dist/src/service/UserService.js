"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const cart_1 = require("../model/cart");
const data_source_1 = require("../data-source");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await this.userRepository.findOneBy();
            return users;
        };
        this.save = async (users) => {
            return this.userRepository.save(users);
        };
        this.findById = async (id) => {
            let user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                return null;
            }
            return user;
        };
        this.checkUser = async (user) => {
            console.log(user);
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                return null;
            }
            return userCheck;
        };
        this.checkUsername = async (user) => {
            let usernameCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!usernameCheck) {
                return null;
            }
            return usernameCheck;
        };
        this.orderProduct = async (quantity, product, user) => {
            let cartCheck = await this.cartRepository.findOneBy({ user: user, product: product });
            if (!cartCheck) {
                let cart = {
                    status: 'buying',
                    quantity: quantity,
                    product: product,
                    user: user,
                };
                return await this.cartRepository.save(cart);
            }
            else {
                cartCheck.quantity += quantity;
                return this.cartRepository.update({ idCart: cartCheck.id }, { quantity: cartCheck.quantity });
            }
        };
        this.findCartByUser = async (user) => {
            let cart = await this.cartRepository.find({ user: user });
            if (!cart) {
                return null;
            }
            return cart;
        };
        this.getAllCart = async () => {
            let cart = await this.cartRepository.find();
            return cart;
        };
        this.changeStatusCart = async (user) => {
            let cart = await this.cartRepository.find({ user: user });
            console.log(cart);
            if (!cart) {
                return null;
            }
            else {
                for (let i = 0; i < cart.length; i++) {
                    await this.cartRepository.update({ idCart: cart[i].idCart }, { status: 'bought' });
                }
                return 'success';
            }
        };
        this.removeCart = async (idCart) => {
            let product = await this.cartRepository.findOneBy({ idCart: idCart });
            if (!product) {
                return null;
            }
            return this.cartRepository.delete({ idCart: idCart });
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.cartRepository = data_source_1.AppDataSource.getRepository(cart_1.Cart);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map