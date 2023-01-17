declare class UserService {
    private userRepository;
    private cartRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (users: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    checkUser: (user: any) => Promise<any>;
    checkUsername: (user: any) => Promise<any>;
    orderProduct: (quantity: any, product: any, user: any) => Promise<any>;
    findCartByUser: (user: any) => Promise<any>;
    getAllCart: () => Promise<any>;
    changeStatusCart: (user: any) => Promise<string>;
    removeCart: (idCart: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
