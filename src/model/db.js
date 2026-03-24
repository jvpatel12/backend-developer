const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connectged sucessfully");
    
})
const schema  = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;


const userSchema  = new schema({
    email:{
        type:String,
        unique:true,
        trim:true,
    },
    password:String,
    firstName:String,
    lastName:String
})
const adminSchema  = new schema({
      
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const courseSchema  = new schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    createdId:objectId
})
const purchaseSchema  = new  schema({
    courseId:objectId,
    userId:objectId
})


const userModel = mongoose.model('User',userSchema);
const adminModel = mongoose.model('Admin',adminSchema);
const courseModel = mongoose.model('Course',courseSchema);
const purchaseModel =mongoose.model('Purchase',purchaseSchema);

module.exports = {
    userModel,adminModel,courseModel,purchaseModel
}
