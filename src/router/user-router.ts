import {Router} from "express";
import userController from "../controller/UserController";

export const userRouter = Router();
userRouter.get('/login', userController.showFormLogin);
userRouter.post('/login', userController.login);
userRouter.get('/register', userController.showFormRegister);
userRouter.post('/register', userController.register);
userRouter.post('/order/:id', userController.orderProduct);
userRouter.post('/pay-order', userController.payOrder);
userRouter.get('/cart', userController.showFormCart);
