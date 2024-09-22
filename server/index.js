const express=require('express')
const app=express()
const DBconnect=require('./config/db')
const authRoute=require('./routes/auth-route')
const courseRoute=require('./routes/courses-route')
const userRoute=require('./routes/user-route')
const cors=require('cors')

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET,POST,PUT,DELETE']
}))

app.use('/api/auth',authRoute)
// app.use('/api/admin')
app.use('/api/users',courseRoute)
app.use('/api',userRoute)

app.listen(3000,()=>{
    try {
        DBconnect()
        console.log('Server running on 3000')
    } catch (error) {
        console.log(error)
    }
})