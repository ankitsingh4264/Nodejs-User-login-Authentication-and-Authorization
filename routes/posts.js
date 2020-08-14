const router=require('express').Router();
const verify=require('./verifytoken');

router.get('/',verify,(req,res)=>{
    // res.send(req.user);
    res.json(
        {
            post:"post created successfully",
            authorization:"you are authorized",
            id:req.user._id

        }
    )
});




module.exports=router;