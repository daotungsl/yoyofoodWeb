export interface IInfoAcc {

    
         data : {
             account : {
                 id : number ;
                 username :  string  ;
                 password :  string  ;
                 typeAccount : number ;
                 storeId : number ;
                 email :  string ;
                 fullName :  string  ;
                 gender : number ;
                 birthday : string ;
                 phone :  string  ;
                 avatar : string ;
                 address : string ;
                 created :  string  ;
                 updated :  string  ;
                 status : number
            },
             credential : {
                 accessToken :  string ;
                 clientType :  string  ;
                 created :  string;
                 expired :  string; 
            }
        },
         message :  string ;
         status : 200
    

}