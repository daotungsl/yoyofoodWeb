export interface IAllVoucher {
     data : [
        {
             id : number,
             name :  String,
             store :  String,
             typeVoucher :  String,
             nameUnAccent :  String ,
             description :  String,
             image :  String,
             codeSale :  String ,
             percent : number,
             maxSlot : number,
             slotLeft : number,
             startDay :  String ,
             expiredDay :  String ,
             promotionTimeDto : {
                 id : number,
                 startTime :  String ,
                 endTime :  String ,
                 dayWeek :  Array<number> 
            },
             created :  String ,
             updated :  String ,
             status : number
        }
    ],
     message :  String ,
     status : number
}