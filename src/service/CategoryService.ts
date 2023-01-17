import {Category} from "../model/category";
import {AppDataSource} from "../data-source";


class CategoryService {
    private categoryRepository
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }


    getAll = async () => {
        // let sql = `select p.id, p.name, p.price, p.image, c.id as idCategory, c.name as nameCategory from product p join category c on p.id = c.id`

        let categories = await this.categoryRepository.find();
        return categories;
    }

}

export default new CategoryService();