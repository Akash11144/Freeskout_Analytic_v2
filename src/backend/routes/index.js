const a=require('express');
const b=a.Router();
const {user}=require('../models');

b.post('/getUser',async(req,res)=>res.send( await user.insertMany([req.body])))

b.get('/getC',async(req,res)=>res.send(await user.find()));

module.exports=b;
