const express=require('express')
const route=express.Router()
const {register,login}=require('../controller/auth-controller')
const authMiddleware=require('../middleware/auth-middleware')

route.post('/register',register)
route.post('/login',login)
route.get('/user',authMiddleware,(req,res)=>{
    res.send(req.user)
})

module.exports=route