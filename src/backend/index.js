const a=require('express');
const b=a();
const c=require("mongoose");
const bp=require('body-parser')
const userRoutes = require('../backend/routes');
const cors=require('cors');
const port=process.env.PORT || 8000;


b.use(cors());
b.use(bp.urlencoded({extended:false}));
b.use(bp.json());


const dbURI=`mongodb+srv://akash:akash@first.k0veb.mongodb.net/Freeskout-analytic?retryWrites=true&w=majority`
const options ={
    useUnifiedTopology:true,
    useNewUrlParser:true
}

c.connect(dbURI,options).then(()=> console.log('connection to database established'));

b.use('/user',userRoutes)


b.listen(port,(req,res)=>console.log('server started'));