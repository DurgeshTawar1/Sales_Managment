import mongoose, { mongo } from "mongoose";


const PurchaseSchema = mongoose.Schema({
    product:{
        type:String,
        required:true,

    },

    supplier:{
        type:String,
        required:true,
       
    },
    quantity:{
        type:String,
        required:true,
    },
    productCost:{
        type:String,
        required:true,
        
    },
    sellPrice:{
        type:String,
        required:true,
    },
    purchaseDate:{
        type:String,
        required:true,
    },
    productExpiry:{
        type:String,
        required:true,
    }
}, {timestamps:true})

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;

