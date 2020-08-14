const jwt=require('jsonwebtoken');
const { json } = require('express');

module.exports=  async function (req,res,next){
   const token =req.header('authtoken');
  
   if(!token) res.status(401).send('Access Denied');
   
   try{
    const verifieduser=  jwt.verify(token,'ankitsecretkey');
    
    req.user=verifieduser;
    next();



   }catch(err){
       res.status(400).send('invalid token');
   }

    
}