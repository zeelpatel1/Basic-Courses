const express=require('express')
const route=express.Router()
const authMiddleware=require('../middleware/auth-middleware')
const adminMiddleware=require('../middleware/admin-middleware')
const Courses=require('../module/courses')

route.get('/courses',authMiddleware,async(req,res)=>{
    try {
        const courses=await Courses.find()
        res.json({courses})
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching courses', error });
    }
})

route.post('/courses',adminMiddleware,async(req,res)=>{
    try {
        const course=new Courses(req.body)
        await course.save()
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ msg: 'Error creating course', error });
    }
})

route.put('/courses/:id',adminMiddleware,async(req,res)=>{
    try {
        const courses=await Courses.findByIdAndUpdate(req.params.id,req.body)
        if(!courses){
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ msg: 'Error updating course', error });
    }
})

route.delete('/courses/:id', adminMiddleware, async (req, res) => {
    try {
        const course = await Courses.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });
        res.status(200).json({ msg: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting course', error });
    }
});

// USERS



module.exports=route