
import * as mongodb from "mongodb";
import IProductRepo  from "../interface/IProductRepo";
import { Product } from "../model/product";
import {collections} from "../database";



export class ProductRepo implements IProductRepo{
    private productCollection : mongodb.Collection<Product>;
  
    constructor () { 
      this.productCollection = collections.products;
    }


    async getProducts(): Promise<Product[]> {
       return await this.productCollection.find({}).toArray();
    }

    async getProduct(productId:string): Promise<Product|null> {
      const query = { _id: new mongodb.ObjectId(productId) };
      return await this.productCollection.findOne(query);      
   }

    async saveProduct(product:Product):Promise<string>{
      const result = await this. productCollection.insertOne(product);
  
        if (result.acknowledged) 
           return result.insertedId.toString();
        
        throw new Error("Failed while trying to insert product");          
        
    }

    async deleteProduct(productId: string): Promise<number|null> {

      const result = await this. productCollection.deleteOne({id: productId});
  
      if (result.acknowledged) 
         return result.deletedCount;
      
      throw new Error("Failed while trying to deleting product");    
    }

}
