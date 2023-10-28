
import ProductDetail from "../model/productDetails";
import { Product } from "../model/product";


interface IProductService {         
    getProducts(): Promise<Product[]|null>
    saveProduct(product:Product):Promise<string>;
    deleteProduct(productId:string):Promise<number>;
    getProduct(productId:string): Promise<ProductDetail|null>
  }

export default IProductService;