import mongoose, { mongo } from "mongoose";


const  ProductSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true,

    },
    quantityType:{
        type:String,
        required:true,

    },
    sku:{
        type:String,
        required:true,

    },

    barcode:{
        type:Number,
        required:true,
       
    },
    productExpiry:{
        type:String,
        required:true,
    },
    quantity:{
      type:String,
      required:true,  
    },
    productCost:{
        type:Number,
        required:true,
    },
    sellPrice:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    productLimitNumber:{
        type:Number,
        required:true,
    },
    Notes:{
        type:String,

    },
    // StoreDetails:{
        shortDescription:{
            type:String,

        },
        detailDescription:{
            type:String,
            
        },
        storePrice:{
            type:Number,
            // required:true,
        },
        image:{
            type:String,
            required:true,
        }
    
}, {timestamps:true})

const Product = mongoose.model("Product", ProductSchema);

export default Product;

