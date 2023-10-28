 

import { injectable } from 'tsyringe';
import axios from 'axios';
 
import { ValidateError } from 'tsoa';
import IBiddingService from '../interface/IBiddingService';
import { Bid } from '../model/bid';


 @injectable()
export class BiddingService implements IBiddingService{
    private bidServiceEndPoint: string;  
  
    constructor () { 
      this.bidServiceEndPoint = "http://localhost:4000/bid/";
    }


    async getBids(productId:string): Promise<Bid[]|null> {       
      
      let bid:Bid[]=[];
      await axios.get(this.bidServiceEndPoint+"show-bids/"+productId)
      .then(function (response) {   
          if(response.status==200)
          {
            if(!response.data){
              console.log(response.data);
              bid= <Bid[]>JSON.parse(response.data);
            }
          }
      })
      .catch(function (error) {  
         console.log(error);
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
      });     
      return bid;
    }    
}