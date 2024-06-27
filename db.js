const mongoose= require('mongoose'); 
require('dotenv').config(); 

//const mongoURL= process.env.MONGODB_URL; //mydatabase with our db name
const mongoURL= process.env.MONGODB_ONLINE; 
mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db= mongoose.connection; 

db.on('connected', ()=>{
    console.log('Mongodb server connected'); 
})

db.on('error', (err)=>{
    console.log('Connection error!:: ', err); 
})

db.on('disconnected', ()=>{
    console.log('Mongodb server disconnected'); 
})

module.exports= db; 
