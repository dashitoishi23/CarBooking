const express=require('express');
const User=require('../../models/users');
const passport=require('passport');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const keys=require('../../config/keys');
const validatorUserRegister=require('../../validation/userRegister');
const validatorUserLogin=require('../../validation/userLogin');


router.post('/register',(req,res)=>{
    const {errors,isValid}=validatorUserRegister(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(404).json({err:"User already exists"});
        }
        else{
            
                   const newUser=new User({
                       name:req.body.name,
                       email: req.body.email,
                       password:req.body.password,
                   });
                   bcrypt.genSalt(10, (err, salt)=> {
                    bcrypt.hash(req.body.password, salt,(err, hash)=> {
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                        .then(user=>{
                            console.log(user)
                        })
                        .catch(err=>console.log(err));
                    });
                }); 
        }
    })
});

router.get('/bookCar',passport.authenticate('faculty',{session:false}),(req,res)=>{
    User.find({email:req.user.email})
    .then(user=>{
        if(req.user.id===null){
            return res.json({note:'Please Login!'})
        }
        else{
            if(user){
                return res.json({cost:cost,name:user.name,email:user.email})
            }
        }
    })
})

let diffDay = 0

router.post('/validCheck',(req,res)=>{
    let diffTim = new Date(req.body.toDate).getTime() - new Date(req.body.fromDate).getTime();
     diffDay = Math.ceil(diffTim / (1000 * 60 * 60 * 24));
    if(diffDay<0){
        res.json({err1:"To date has to be AFTER From Date"})
    }
    if(req.body.travelMode==='Multi City'&&(req.body.to!==req.body.thirCity)||(req.body.from===req.body.thirCity)){
        res.json({err2:"To and third city cannot be different OR From and third city can't be same "})
        //err.destErr = "Destination mismatch! From and third city cannot be different OR To and third city can't be same "
    }
    else{
        res.json({note:"All Good!",diff:diffTim})
    }
})

router.post('/carSearch',(req,res)=>{
    const from = 'Bangalore'
    let diffTim = new Date(req.body.toDate).getTime() - new Date(req.body.fromDate).getTime();
    let diffDayss = Math.ceil(diffTim / (1000 * 60 * 60 * 24));
    let cost = 0
     cost = cost + (diffDayss*250)
    if(req.body.travelMode==='Multi City'){
         cost = cost + (600*parseInt(req.body.driverPack))
    }
    else if(req.body.travelMode==='Round Trip'){
         cost = cost + (600 * parseInt(req.body.driverPack))
    }
    else if(req.body.travelMode==='One Way'){
        cost = cost + (300 * parseInt(req.body.driverPack))
    }
    res.json({cost:cost+1500})
})

router.post('/login',(req,res)=>{
    const {errors,isValid}=validatorUserLogin(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        
        if(user){
            bcrypt.compare(req.body.password,user.password)
            .then(isMatch=>{
                if(!isMatch){
                    return res.status(404).json({err:"invalid password"})
                }
                else{
                    const payload={id:user.id,email:user.email,name:user.name};
                    jwt.sign(payload,keys.secretOrKey,{expiresIn:60*60*3},
                        (err,token)=>{
                            res.json({
                                success:true,
                                userName:payload.name,
                                userEmail: payload.email,
                                token:'bearer '+token
                            })
                    })
                    // return res.json({ok:"email"}) 
                }
            })
        }
        else{
            return res.status(404).json({err:"invalid email"})
        }
    })
})
module.exports=router;