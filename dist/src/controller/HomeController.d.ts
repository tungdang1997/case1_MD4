import { Request, Response } from "express";
declare class HomeController {
    private productService;
    private categoryService;
    constructor();
    showHome: (req: Request, res: Response) => Promise<void>;
    showFormCreate: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    showFormEdit: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    removeProduct: (req: Request, res: Response) => Promise<void>;
    showFormRemove: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
