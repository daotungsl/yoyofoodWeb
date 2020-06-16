export interface IInfoSo {

    data: {
        id: number,
        name: String,
        nameUnAccent: String,
        email: String,
        phone: String,
        image: String,
        created: String,
        updated: String,
        status: String,
        accountId: number,
        typeStore: String,
        storeAddresses: []
    },
    message: String,
    status: number

}