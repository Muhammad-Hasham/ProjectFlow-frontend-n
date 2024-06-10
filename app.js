const express = require('express');

const userRouter=require("./routes/UserRoute")
const projectRouter=require("./routes/projectRoute")
const cookieParser=require("cookie-parser")

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/users',userRouter)
app.use('/api/v1/projects',projectRouter)


module.exports = app;