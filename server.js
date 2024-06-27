const express= require('express'); 
const app= express(); 
const db= require('./db'); 
require('dotenv').config(); 

app.get('/', function(req, res){
    res.send('Server Hotel is running now'); 
})

const bodyParser= require('body-parser'); 
app.use(bodyParser.json());

const personRoute= require('./routes/personRoute');  
app.use('/person', personRoute); 

const menuRoute= require('./routes/menuRoute');  
app.use('/menu', menuRoute); 

const PORT= process.env.PORT || 5000; 

app.listen(PORT, ()=>{
    console.log('Server running...');
}); 