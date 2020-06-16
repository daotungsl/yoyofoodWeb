export const ERROR_REGISTER ={
    fullName: {
        required : 'Full name must not empty',
        minLength: 'Minimum 6 character'
    },
    phone: {
        required : 'Phone number must not empty',
        syntax: 'Phone number must like : +84123456789, 0123456789,.....'
    },
    email: {
        required : 'Email must not empty',
        syntax: 'Email must like : abc@example.com'
    },
    password: {
        required : 'Password must not empty',
        syntax: 'Password must be at least 8 characters and must contain: 1 uppercase letter, 1 lowercase letter and 1 number'
    },
    repassword: {
        required : 'Confirm Password must not empty',
        syntax: 'Passwords must match'
    },
    gender: {
        required : 'Gender must not empty',
    },

}
export const ERROR_ADDRESS ={
    address: {
        required : 'Address must not empty',
        maxLength: 'Only 100 character'
    },
    description: {
        required : 'Description must not empty',
        minLength: 'Description more than 20 characters'
    },
    cityId: {
        required : 'City must be chosen',
        syntax: ''
    },
    storeId: {
        required : 'Store must be chosen',
        syntax: ''
    },

}
export const ERROR_SHOP_INFO ={
    name: {
        required : 'Account name must not empty',
        maxLength: 'Only 100 character'
    },
    email: {
        required : 'Email must not empty',
        syntax: 'Email must like : abc@example.com'
    },
    phone: {
        required : 'Phone number must not empty',
        syntax: 'Phone number must like : +84123456789, 0123456789,.....'
    },
    image: {
        required : 'Image must not empty',
        syntax: ''
    },
    typeStoreId: {
        required : 'TypeStore must not empty',
        syntax: ''
    },

}
export const ERROR_ODER_VOUCHER ={
    address: {
        required : 'Store address must be chosen',
    },
    time: {
        required : 'Time must be chosen',
    },
    adults: {
        required : 'Aults must be chosen',

    },
    children: {
        required : 'Children must be chosen',

    },
    description: {
        required : 'Description must not empty',
        syntax: ''
    },
    day: {
        required : 'Day must be chosen',
        syntax: ''
    },

}
export const ERROR_SHOP_VOUCHER ={
    name: {
        required : 'Name must not empty',
        maxLength: 'Only 200 character'
    },
    description: {
        required : 'Description must not empty',
        maxLength: 'Only 1000 character'
       
    },
    image: {
        required : 'Image must not empty',
        syntax: ''
    },
    percent: {
        required : 'Percent must not empty',
        syntax: ''
    },
    maxSlot: {
        required : 'Max slot must not empty',
        syntax: ''
    },
    startDay: {
        required : 'Start day must not empty',
        syntax: ''
    },
    expiredDay: {
        required : 'End day must not empty',
        syntax: ''
    },
    startTime: {
        required : 'Start time must not empty',
        syntax: ''
    },
    endTime: {
        required : 'End time must not empty',
        syntax: ''
    },
    dayWeek: {
        required : 'Day week must not empty',
        syntax: ''
    },
    typeVoucherId: {
        required : 'TypeStore must not empty',
        syntax: ''
    }

}
export const ERROR_ODER_PRODUCT ={
    address: {
        required : 'Store address must be chosen',
    },
    time: {
        required : 'Time must be chosen',
    },
    adults: {
        required : 'Aults must be chosen',

    },
    children: {
        required : 'Children must be chosen',

    },
    description: {
        required : 'Description must not empty',
        syntax: ''
    },
    day: {
        required : 'Day must be chosen',
        syntax: ''
    },

}
export const ERROR_SHOP_PRODUCT ={
    name: {
        required : 'Name must not empty',
        maxLength: 'Only 200 character'
    },
    description: {
        required : 'Description must not empty',
        maxLength: 'Only 1000 character'
       
    },
    image: {
        required : 'Image must not empty',
        syntax: ''
    },
    percent: {
        required : 'Percent must not empty',
        syntax: ''
    },
    maxSlot: {
        required : 'Max slot must not empty',
        syntax: ''
    },
    startDay: {
        required : 'Start day must not empty',
        syntax: ''
    },
    expiredDay: {
        required : 'End day must not empty',
        syntax: ''
    },
    startTime: {
        required : 'Start time must not empty',
        syntax: ''
    },
    endTime: {
        required : 'End time must not empty',
        syntax: ''
    },
    dayWeek: {
        required : 'Day week must not empty',
        syntax: ''
    },
    typeProductId: {
        required : 'TypeStore must not empty',
        syntax: ''
    }

}
