const mongoose= require('mongoose'); 

const mongoURL= 'mongodb://localhost:27017/Hotel'; //mydatabase with our db name
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
