const express= require('express');
const app= express();
const connectToDatabase= require('./database/database.connection');

const authRoutes = require('./routes/auth.route'); 

app.use('/', authRoutes);

app.listen(3000,()=>{
    console.log("server started at port 3000");
})

connectToDatabase();

