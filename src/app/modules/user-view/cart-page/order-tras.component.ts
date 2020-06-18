import { orderDetails } from "./orderDetails.component";

export class Iorder {

     account_id: number;
     description: string;
     orderDetails: [
          orderDetails
     ];
     total: number;
     typePay: number;

}
