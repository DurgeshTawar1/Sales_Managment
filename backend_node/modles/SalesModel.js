  import mongoose from "mongoose";



  const salesSchema = mongoose.Schema({
    customer:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    newProduct:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        // required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    tax:{
        type:Number,
        required:true,
    },
    shipping:{
        type:Number,
        required:true,
    },
    discountFlat:{
     type:Number,
    },
    taxFlat:{
        type:Number,
    },
  customerPaid:{
    type:Number,
    required:true,
  },
  notes:{
    type:String,
  },
  orderNo:{
    type:Number,
    required:true,
  },
  status:{
    type:String,
    required:true,
  },
  paymentType:{
    type:String,
    // required:true,
  },
  uploadImage:{
    type:String,
    required:true,
  },

  }, {timestamps:true});


  const Sales = mongoose.model("Sales", salesSchema);

  export default Sales;
  