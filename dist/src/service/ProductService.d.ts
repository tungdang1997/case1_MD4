declare class ProductService {
    constructor();
    getAll: () => Promise<Omit<import("mongoose").Document<unknown, any, import("../model/product").IProduct> & import("../model/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    save: (product: any) => Promise<import("mongoose").Document<unknown, any, import("../model/product").IProduct> & import("../model/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById: (id: any) => Promise<import("mongoose").Document<unknown, any, import("../model/product").IProduct> & import("../model/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private update;
    private remove;
}
declare const _default: ProductService;
export default _default;
