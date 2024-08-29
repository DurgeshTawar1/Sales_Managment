import mongoose, { mongo } from "mongoose";


const CustomerSchema = mongoose.Schema({
    customerName:{
        type:String,
        required:true,

    },

    customerContact:{
        type:Number,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    customerEmail:{
        type:String,
        required:true,
        unique:true,
    },
    notes:{
        type:String,
        
    },
    AdvancedPaid:{
        type:Number,
        required:true,

    },
    discountRate:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
   
})

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;

