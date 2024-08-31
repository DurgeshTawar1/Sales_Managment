import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    // _id: { type: String, required: true },
    categoryname:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
    },
}, {timestamps:true})

const Category = mongoose.model("Category", categorySchema);
export default Category;

