import mongoose, { mongo } from "mongoose";


const IncomeSchema = mongoose.Schema({
    incomeName:{
        type:String,
        required:true,
        unique:true,

    },

    amount:{
        type:String,
        required:true,
       
    },
    incomeSource:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        
    },
    typeIncomeSource:{
        type:String,
    },
    incomeDetails:{
        type:String,
       

    },
}, {timestamps:true})

const Income = mongoose.model("Income", IncomeSchema);

export default Income;

