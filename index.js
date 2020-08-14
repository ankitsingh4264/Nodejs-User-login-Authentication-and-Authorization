const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
//import module
const authroute=require('./routes/auth');
const postroute=require('./routes/posts');

//connect to local mongodb
mongoose.connect('mongodb://localhost/project')
     .then(()=>{ console.log('connected to mongodb')});

app.use(express.json());


//middleware route
app.use('/api/user',authroute);
app.use('/api/post',postroute);

app.listen(3000,()=>{ console.log('server up and running')});