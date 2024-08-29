import mongoose, { mongo } from "mongoose";


const ExpenseSchema = mongoose.Schema({
    expenseName:{
        type:String,
        required:true,

    },

    cost:{
        type:String,
        required:true,
       
    },
    category:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        
    },
    typeCategory:{
        type:String,
    },
    expenseDetails:{
        type:String,
       

    },
}, {timestamps:true})

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;

