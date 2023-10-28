
import "reflect-metadata";
import IProductService from "../interface/IProductService";
import {injectable, inject, singleton} from "tsyringe";
import { Product } from "../model/product";
import { ValidationError } from "../exception/ValidationError";
import {  Body, Get, Post, Route, SuccessResponse } from "tsoa";
import ProductDetail from "../model/productDetails";


@singleton()
@injectable()
@Route("product")

export class ProductController {
    private productService: IProductService;  
    
    constructor (@inject("IProductService")productService: IProductService) { 
      this.productService = productService;
    }
    
  /**
   * Retrieves the list  of a products.
   
   */
    @Get()
     public async getProducts(): Promise<Array<Product>|null> {
      return await this.productService.getProducts();
     } 
       
    

    /**
   * Retrieves the list  a products.
   
   */
     @Get(":productId")
     public async getProductDetail(productId:string): Promise<ProductDetail>{
      return await this.productService.getProduct(productId);
       
    }



    /**
   * Save a product.
   
   */
    @SuccessResponse("201", "Created") 
    @Post()
      public async saveProduct( @Body() product:Product): Promise<string> {
         
        const validationMsg= this.validateProduct(product)
        if(!validationMsg)  
          return this.productService.saveProduct(product);
        else
         throw new ValidationError(validationMsg);
    }

    validateProduct= (product: Product):string=> {
      
      if(product.name.length<5 || product.name.length>30)
        return "Product name should follow min 5 to max 30 chars";
    
      if(product.bidEndDate<= new Date())  
        return "Bid start date should be a future date";      
      
      if(product.startingPrice<=0)  
        return "Starting price must be greter than 0";      
       
      
      return "";
    }
  }
  
  export default ProductController ;



