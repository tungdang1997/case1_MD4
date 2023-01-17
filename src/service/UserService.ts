import {User} from "../model/user";
import {Order} from "../model/order";
import {Product} from "../model/product";
import {Cart} from "../model/cart";
import {AppDataSource} from "../data-source";
import {Category} from "../model/category";



class UserService {
    private userRepository
    private cartRepository
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.cartRepository = AppDataSource.getRepository(Cart)

    }
    getAll = async () => {
        let users = await this.userRepository.findOneBy();
        return users;
    }

    save = async (users)=>{
        return this.userRepository.save(users)
    }
    findById = async (id) => {
        let user = await this.userRepository.findOneBy({id: id});
        if(!user){
            return null;
        }
        return user;
    }

    checkUser = async (user) => {
        console.log(user)
        let userCheck = await this.userRepository.findOneBy({username: user.username});
        if (!userCheck) {
            return null;
        }
        return userCheck;
    }

    checkUsername = async (user) => {
        let usernameCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!usernameCheck) {
            return null;
        }
        return usernameCheck;
    }

    orderProduct = async (quantity, product, user) => {
        let cartCheck = await this.cartRepository.findOneBy({ user: user, product: product});
        if (!cartCheck) {
            let cart = {
                status: 'buying',
                quantity: quantity,
                product: product,
                user: user,
            }
            return await this.cartRepository.save(cart);
        }
        else {
            cartCheck.quantity += quantity;
            return this.cartRepository.update({idCart: cartCheck.id}, {quantity: cartCheck.quantity});
        }
    }

    findCartByUser = async (user) => {
        let cart = await this.cartRepository.find({ user: user })
        if (!cart) {
            return null;
        }
        return cart;
    }

    getAllCart = async () => {
        let cart = await this.cartRepository.find()
        return cart;
    }

    changeStatusCart = async (user) => {

        let cart = await this.cartRepository.find({ user: user })
        console.log(cart)
        if (!cart) {
            return null;
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                await this.cartRepository.update({idCart: cart[i].idCart}, {status: 'bought'})
            }
            return 'success';
        }
    }

    removeCart = async (idCart)=>{

        let product = await this.cartRepository.findOneBy({idCart: idCart})
        if (!product){
            return null
        }
        return this.cartRepository.delete({idCart: idCart})
    }


}

export default new UserService();