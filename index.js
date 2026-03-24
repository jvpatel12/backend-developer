const express = require('express');
const courseRouter = require('./src/routes/course');
const userRouter =require('./src/routes/user')
const adminRouter = require('./src/routes/admin')
const app= express();
const db=require('./src/model/db');

app.use(express.json())

app.use('/api/v1/course',courseRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);







app.listen(3004,()=>{
    console.log("server is ruunig the 3004")
})