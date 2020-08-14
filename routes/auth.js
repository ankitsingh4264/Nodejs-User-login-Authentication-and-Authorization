const router=require('express').Router();

const usermodel=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {loginvalidation,registervalidation}=require('../validation');





router.post('/register',async (req,res)=>{
    const {error}=registervalidation(req.body);
    if(error) res.send(error.details[0].message);

    //check if email already exist
    const emailexist=await usermodel.findOne({email:req.body.email});
    if(emailexist) return res.status(400).send('email already exist');

    //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,salt);


    const user=new usermodel({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    });

    try{
        const usersaved= await user.save();
        res.send(usersaved);
     }catch(err){
        res.status(400).send(err);
    

    }
  
});

router.post('/login',async (req,res)=>{
    const {error}=loginvalidation(req.body);
    if(error)  return res.send(error.details[0].message);

    //check if user exist with given email
    const user= await usermodel.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email');

    //validate password

    const validpassword=await bcrypt.compare(req.body.password,user.password);
    if(!validpassword) return res.status(400).send('invalid password')


    //get token jwt
   
    const token=jwt.sign({id:user._id},'ankitsecretkey');
    res.header('auth-token',token).send(token);

    // res.send('Logged in succesfully');


})





module.exports=router;