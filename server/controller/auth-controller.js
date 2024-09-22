const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../module/user')

const SECRET_KEY='1234'

const register=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const userCheck=await User.findOne({email})
        if(userCheck){
            return res.status(400).json({msg:'User already exist'})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser = await User.create({ username, email, password: hashPassword });

        return res.status(200).json({
            msg:'User created Successfully'
        })

    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
}

const login=async(req,res)=>{
    try {

        const {email,password}=req.body
        const checkUser=await User.findOne({email})
        if(!checkUser){
            return res.status(400).json({msg:'User does not exist'})
        }
        const checkPassword=await bcrypt.compare(password,checkUser.password)
        if(!checkPassword){
            return res.status(400).json({msg:'Invalid Credential'})
        }
        const payload={userId:checkUser._id}
        const token=jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'})
    
        return res.status(200).json({
            msg:'LogIn Successful',
            token:token
        })
        
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
}

module.exports={register,login}