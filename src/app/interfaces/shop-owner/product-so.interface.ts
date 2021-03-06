export interface IProductSO {

     data:
     {
          id: number,
          name: String,
          store: String,
          storeId: number,
          icon: String,
          typeProduct: String,
          nameUnAccent: String,
          description: String,
          image: String,
          codeSale: String,
          percent: number,
          maxSlot: number,
          price:number,
          slotLeft: number,
          startDay: String,
          expiredDay: String,
          storeAddress:{
               address:String,
               city:String,
               created:String,
               description:String,
               id:number,
               status:number,
               store:String,
               updated:String

          }
          promotionTimeDto: {
               id: number,
               startTime: string,
               endTime: string,
               dayWeek: string
          },
          created: String,
          updated: String,
          status: number
     }
     ,
     message: String,
     status: number
}