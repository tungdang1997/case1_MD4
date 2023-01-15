import {User} from "../model/user";
import {Order} from "../model/order";
import {Product} from "../model/product";
import {Cart} from "../model/cart";



class UserService {
    constructor() {
    }

    getAll = async () => {
        let users = await User.find();
        return users;
    }
    save = async (users)=>{
        return User.create(users)
    }
    findById = async (id) => {
        let user = await User.findOne({_id: id});
        if(!user){
            return null;
        }
        return user;
    }

    checkUser = async (username) => {
        let userCheck = await User.findOne({username: username});
        if (!userCheck) {
            return null;
        }
        return userCheck;
    }

    checkUsername = async (user) => {
        let usernameCheck = await User.findOne({ username: user.username});
        if (!usernameCheck) {
            return null;
        }
        return usernameCheck;
    }

    private orderProduct = async (quantity, product, user) => {
        let cartCheck = await Cart.findOne({ users: user, product: product});
        if (!cartCheck) {
            let cart = {
                status: 'buying',
                quantity: quantity,
                product: product,
                users: user,
            }
            return await Cart.create(cart);
        }
        else {
            cartCheck.quantity += quantity;
            return Cart.updateOne({_id: cartCheck._id}, {quantity: cartCheck.quantity});
        }
    }

    findCartByUser = async (user) => {
        let cart = await Cart.find({ users: user }).populate('product').populate('users');
        if (!cart) {
            return null;
        }
        return cart;
    }

    getAllCart = async () => {
        let cart = await Cart.find().populate('product').populate('user');
        return cart;
    }

    changeStatusCart = async (user) => {
        let cart = await Cart.find({ users: user }).populate('product').populate('user');
        if (!cart) {
            return null;
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                await Cart.updateOne({_id: cart[i]._id}, {status: 'bought'})
            }
            return 'success';
        }
    }


}

export default new UserService();