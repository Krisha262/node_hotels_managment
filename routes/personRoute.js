const express= require('express'); 
const router= express.Router(); 
const person= require('./../models/person'); 

router.post('/', async(req, res)=>{
    try{
        const data= req.body; 
        const newPerson= new person(data);
        const response= await newPerson.save();
        console.log('data saved', response); 
        res.status(200).json(response);  
    }
    catch(err){
        console.log(err); 
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/', async(req, res)=>{
    try{
        const data= await person.find(); 
        console.log('data fetched from person'); 
        res.status(200).json(data); 

    }
    catch(err){
        console.log(err); 
    res.json(500).json({error: 'Server error'}); 
    }
})

//colon means for each data belongs to work enum-- like iterator
router.get('/:workType', async(req, res)=>{
    try{
        const workType= req.params.workType; //type of parameter-> url changes as per the parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response= await person.find({work: workType}); 
            console.log('Response fetched'); 
            res.status(200).json(response); 
        }

        else{
            res.status(404).json({error: 'Invalid work type'}); 
        }
    }
    catch(err){
        console.log(err); 
        res.json(500).json({error: 'Internal Server Error'});
    }
})               

router.put('/:id', async (req, res)=>{        //id is variable here 
    try{
        const personId= req.params.id; //extracts id from url parameter
        const updatedata= req.body; //data to be updated 
        
        const response= await person.findByIdAndUpdate(personId, updatedata, {
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'}); 
        }

        console.log('data updated'); 
        res.status(200).json(response); 

    }
    catch(err){
        console.log(err); 
        res.json(500).json({error: 'Server error'}); 
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const personId= req.params.id;
        const response= await person.findByIdAndDelete(personId);

        
        if(!response){
            return res.status(404).json({error: 'Person not found'}); 
        }

        console.log('data deleted'); 
        res.status(200).json({error: 'Data deleted successfully'});
    }
    catch(err){
        console.log(err); 
        res.json(500).json({error: 'Server error'}); 
    }
})

module.exports= router; 