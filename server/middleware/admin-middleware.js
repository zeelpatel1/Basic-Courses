const jwt=require('jsonwebtoken')
const SECRET_KEY='1234'
const User=require('../module/user')

const adminMiddleware=async(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({ msg: 'No token provided, authorization denied' });
    }
    const jwtToken = token.replace('Bearer', "").trim();
    try {
        const decoded = jwt.verify(jwtToken, SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if(!user.isAdmin){
            return res.status(403).json({ msg: 'Access denied, admin only' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports=adminMiddleware