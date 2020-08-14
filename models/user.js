const mongoose=require('mongoose');


//create a use schema
const userschema=new mongoose.Schema({
   name:{
       type:String,
       required:true,
       maxlength:255
   },
   email:{
       type:String,
       required:true,
       maxlength:100
   },
   password:{
       type:String,
       required:true,
        minlength:4,
        maxlength:1024
   },
   date:{
       type:Date,
       default:Date.now
   }

});

const usermodel=mongoose.model('user',userschema);

module.exports=usermodel;