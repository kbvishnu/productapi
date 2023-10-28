
import { Bid } from "../model/bid"; 

interface IBiddingService {         
    getBids(productId:string): Promise<Bid[]|null>    
  }

export default IBiddingService;