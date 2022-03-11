
const a = require('mongoose');
// const joi=require('joi');

const userSchema = new a.Schema({
    browser_name:String,
    browser_version:String,
    id:String,
    ip:String,
    os_architecture:Number,
    os_name:String,
    os_version:String,
    product_manufacturer:String,
    product_name:String,
    time:String
},{strict:false});

const user = a.model('user-data',userSchema);

// function validate(user){
//     const joiSchema = joi.object({
//         name:joi.string().required().min(3).max(20).regex(/[$\{\}*<>]/,{invert:true}),
//         number:joi.number().required().min(10),
//         email:joi.string().required().email({tlds:{allow:['com','net']}}),
//         gender:joi.string().required().valid('male','female','dont want to share')
//     }).options({abortEarly:false})

//     return joiSchema.validate(user)
// }

module.exports={user};