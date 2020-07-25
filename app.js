const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const port=80;
const pug=require('pug');
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dancecontact', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected ')
})
//define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    concern: String,
  });
  //declaring model
const contactmodel = mongoose.model('contactmodel',contactschema);
app.use('/static',express.static('static'));
app.use(express.urlencoded({extended :true}));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.get('/',function(req,res){
    const param={};
    res.status(200).render('home.pug',param)
})
app.get('/contact',function(req,res){
    const param={};
    res.status(200).render('contact.pug',param)
})
app.post('/contact',function(req,res){
    var mydata = new contactmodel(req.body);
    mydata.save().then(()=>{
         const param={};
         res.status(200).render('contact.pug',param);
         
         //  res.send('data has been submited')
    }).catch(()=>{
        // res.status(400).send('error')
    })
    
})

app.listen(port,()=>{
    console.log(`listening at ${port}`);
})