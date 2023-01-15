import {Router} from "express";
import homeController from "./../controller/HomeController";

export const productRouter = Router();
productRouter.get('/create', homeController.showFormCreate);``
productRouter.post('/create' , homeController.create);
productRouter.get('/edit/:id',homeController.showFormEdit);
productRouter.post('/edit/:id',homeController.updateProduct);
productRouter.get('/delete/:id',homeController.showFormRemove);
productRouter.get('/remove/:id',homeController.removeProduct);
productRouter.get('/detail/:id',homeController.showFormDetail);
productRouter.post('/search',homeController.search);
