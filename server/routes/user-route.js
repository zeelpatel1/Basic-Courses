const authMiddleware=require('../middleware/auth-middleware')
const express=require('express')
const Courses=require('../module/courses')
const route=express.Router()

route.get('/getCourse',authMiddleware,async(req,res)=>{
    try {
        const courses=await Courses.find({published:true})
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching courses', error });
    }
})



module.exports=route