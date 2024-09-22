const mongoose=require('mongoose')

const DBconnect=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Course')
        console.log('MongoDB connected...')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports=DBconnect