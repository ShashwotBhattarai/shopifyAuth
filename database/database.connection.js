const mongoose = require('mongoose');
require('dotenv').config();

function connectToDatabase(){
  console.log("inside connection");
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
}
    module.exports= connectToDatabase;