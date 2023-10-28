import * as mongodb from "mongodb";
 
export interface Product {
   name: string;
   shortDescription: string;
   detailedDescription : string,
   category :    "Painting" | "Sculptor" | "Ornament";
   startingPrice: number;
   bidEndDate : Date;
   _id?: mongodb.ObjectId;
}