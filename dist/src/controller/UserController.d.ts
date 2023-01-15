import { Request, Response } from "express";
declare class HomeController {
    private userService;
    private productService;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    showFormRegister: (req: Request, res: Response) => Promise<void>;
    login: (req: any, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    orderProduct: (req: any, res: Response) => Promise<void>;
    showFormCart: (req: any, res: Response) => Promise<void>;
    payOrder: (req: any, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
