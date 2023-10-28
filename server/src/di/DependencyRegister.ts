import { container, Lifecycle } from "tsyringe";
import IProductRepo from "../interface/IProductRepo";
import IProductService from "../interface/IProductService";
import {ProductRepo }from "../implementations/ProductRepo";
import {ProductService} from "../implementations/ProductService";
import ProductController from "../controller/ProductController"; 
import { BiddingService } from "../implementations/BiddingService";
import IBiddingService from "../interface/IBiddingService";
 



export  function registerDependencies() {
    
    
    container.register<IProductRepo>('IProductRepo', {useClass: ProductRepo},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IBiddingService>('IBiddingService', {useClass: BiddingService},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IProductService>('IProductService', {useClass: ProductService},  
    { lifecycle: Lifecycle.Singleton } );

    container.registerSingleton(ProductController);
    
    
    return container;
    
}
