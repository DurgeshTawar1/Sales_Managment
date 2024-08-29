import mongoose, { mongo } from "mongoose";


const SupplerSchema = mongoose.Schema({
    supplierName:{
        type:String,
        required:true,

    },

    phone:{
        type:Number,
        required:true,
       
    },
    contactPersonName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
    },
}, {timestamps:true})

const Supplier = mongoose.model("Supplier", SupplerSchema);

export default Supplier;

