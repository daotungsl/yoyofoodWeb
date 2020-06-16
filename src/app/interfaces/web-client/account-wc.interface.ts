export interface IAccount{
      data : {
           account : {
               id : number,
               username :  String,
               password :  String ,
               typeAccount : number,
               storeId : number,
               email :  String ,
               fullName : String,
               gender : number,
               birthday : Date,
               salt : String,
               phone :  number ,
               avatar : String,
               address : String,
               created :  String ,
               updated :  String ,
               status : number
          },
           credential : {
               accessToken :  String ,
               clientType :  String ,
               created :  String ,
               expired :  String 
          }
      },
       message :  String ,
       status : number

}