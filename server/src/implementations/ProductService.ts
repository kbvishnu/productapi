import {injectable, inject} from "tsyringe";
import IProductRepo  from "../interface/IProductRepo";
import { Product } from "../model/product";

import IProductService from "../interface/IProductService";
import IBiddingService from "../interface/IBiddingService";
import ProductDetail from "../model/productDetails";
import { Bid } from "../model/bid";

@injectable()
export class ProductService implements IProductService{
    private productRepo: IProductRepo;  
    private biddingService: IBiddingService;
  
    constructor (@inject("IProductRepo")productRepo: IProductRepo,
    @inject("IBiddingService")biddingService: IBiddingService) { 
      this.productRepo = productRepo;
      this.biddingService=biddingService;
    }


    async getProducts(): Promise<Product[]> {
      return await this.productRepo.getProducts()
    }    

    async saveProduct(product: Product): Promise<string> {
       return await this.productRepo.saveProduct(product);      
    }

    async deleteProduct(productId: string): Promise<number> {
      return await this.productRepo.deleteProduct(productId);
    }

    async getProduct(productId:string): Promise<ProductDetail> {
      const product:Product= await this.productRepo.getProduct(productId);
      console.log(product);
      const bid:Bid[]= await this.biddingService.getBids(productId);
      const productDetail: ProductDetail ={ "product":product, "bids": bid};
      return productDetail;
    }    

}