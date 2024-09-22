const jwt=require('jsonwebtoken');
const SECRET_KEY='1234'
const User=require('../module/user')

const authMiddleware=async(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({ msg: 'No token provided, authorization denied' });
    }
    const jwtToken = token.replace('Bearer', "").trim();
    try {
        const decoded = jwt.verify(jwtToken, SECRET_KEY);
        const userId=decoded.userId
        // console.log(userId)
        const user=await User.findById(userId,{password:0})
        req.user=user
        req.username=user.username
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
module.exports=authMiddleware