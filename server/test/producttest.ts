
import { Mock, It, Times } from "moq.ts";
import { describe, expect,it } from '@jest/globals';

import IProductRepo from '../src/interface/IProductRepo';
import IProductService from '../src/interface/IProductService'
import { Product } from '../src/model/product';
import ProductController from '../src/controller/ProductController';
import {ProductService} from '../src/implementations/ProductService';


const arrangeProducts=():Product=>{
  const product : Product={
    name:"DaVinchi",
    shortDescription:"The Last Supper",
    detailedDescription:"The Last Supper and Its secrets by Robert Langdon",
    category:"Painting",
    startingPrice:100,
    bidEndDate: new Date("2023-04-01")
  };        
  return product;

}

describe('Validate product', () => {
 
 
  const mockProductRepo= new Mock<IProductRepo>();      
  const mockProductObject=mockProductRepo.object();  
  const productService:IProductService= new ProductService(mockProductObject);
  const productController= new ProductController(productService);

  it(`When product name is empty`, async() => {
  
    const productName=arrangeProducts();
    productName.name="";
     
    try {
      
      await productController.saveProduct(productName);
    } catch(e) {          
      expect(e.message).toMatch("Product name should follow min 5 to max 30 chars");
    }
  }),
  it(`When product name has more than 30 chars`, async() => {
  
    const productName=arrangeProducts();
    productName.name="hippopotomonstrosesquipedaliophobes ";   
   
    try {
      
      await productController.saveProduct(productName);
    } catch(e) {          
      expect(e.message).toMatch("Product name should follow min 5 to max 30 chars");
    }
  }),
  it(`When product bid end date is past date `, async() => {
  
    const productEd=arrangeProducts();
    productEd.bidEndDate= new Date("2022-01-01");
    
    try {
      
      await productController.saveProduct(productEd);
    } catch(e) {          
      expect(e.message).toMatch("Bid start date should be a future date");
    }
  }) ,
  it(`When product start price is less than or equal to zero `, async() => {
  
    const productEd=arrangeProducts();
    productEd.startingPrice= 0;
    
    try {
      
      await productController.saveProduct(productEd);
    } catch(e) {          
      expect(e.message).toMatch("Starting price must be greter than 0");
    }
  })   
});


describe('Get product', () => {   
      
  it(`Returns List of products `, async () => {
              
    const product = arrangeProducts();

    const products=  [product];
    
    const mockProductRepo=  
    new Mock<IProductRepo>()    
    .setup(async instance => instance.getProducts()).returnsAsync(products);

    const mockProductObject=mockProductRepo.object();   

    const productService:IProductService= new ProductService(mockProductObject);
    const productController= new ProductController(productService);   

    const actual = await productController.getProducts();

    expect(actual).toBe(products);
    mockProductRepo.verify(instance=>instance.getProducts,Times.Once());         
    
    })
         
})

describe('Save product', () => {
  
  it(`Returns product id`, async () => {
              
    const product = arrangeProducts();  

    const mockProductRepo=  
    new Mock<IProductRepo>()    
    .setup(async instance => instance.saveProduct(It.IsAny<Product>())).returnsAsync("productId");

    const mockProductObject=mockProductRepo.object();   
    const productService:IProductService= new ProductService(mockProductObject);
    const productController= new ProductController(productService);   

    const actual = await productController.saveProduct(product);
    expect(actual).toBe("productId");
    mockProductRepo.verify(instance=>instance.saveProduct,Times.Once());         
    
    })
  
  })



 
 
    