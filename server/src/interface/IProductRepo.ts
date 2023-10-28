import { Product } from "../model/product";


interface IProductRepo {         
    getProducts(): Promise<Product[]>;
    getProduct(productId:string):Promise<Product|null>;
    saveProduct(product:Product):Promise<string>;
    deleteProduct(productId:string):Promise<number>;
  }

export default IProductRepo;