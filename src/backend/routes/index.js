const a=require('express');
const b=a.Router();
const {user,validate}=require('../models');

b.post('/getUser',async(req,res)=>{
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details.map(err=>err.message));
    console.log("in routes",req.body);
    let data= await user.insertMany([req.body]);
    res.send(data);
})

b.get('/getC',async(req,res)=>{
    let data= await user.find();
    res.send(data);
})

module.exports=b;
