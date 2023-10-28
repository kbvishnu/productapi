import * as mongodb from "mongodb";
import { Product } from "./model/product";
 
export const collections: {
   products?: mongodb.Collection<Product>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("");
   await applySchemaValidation(db);
 
   const productsCollection = db.collection<Product>("products");
   collections.products = productsCollection;
}
 
 
async function applySchemaValidation(db: mongodb.Db) {
//    const jsonSchema = {
//        $jsonSchema: {
//            bsonType: "object",
//            required: ["name","category","startingPrice","bidEndDate"],
//            additionalProperties: true,
//            properties: {
//               _id: {},
//                name: {
//                    bsonType: "string",
//                    description: "'name' is required and is a string",
//                },
               
//                category: {
//                    bsonType: "string",
//                    description: "'category' is required and is one of 'Painting', 'Sculptor', or 'Ornament'",
//                    enum: ["Painting", "Sculptor", "Ornament"],
//                },
//                startingPrice: {
//                 bsonType: "number",
//                 description: "'startingPrice' is required and is a string",
               
//                },
//                bidEndDate: {
//                 bsonType: "date",
//                 description: "'bidEndDate' is required and is a string",
               
//                }
//            },
//        },
//    };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "products",
       //validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("products"); //{validator: jsonSchema});
       }
   });
}