const express = require('express');
var router = express.Router();

var myFunctions=require('../controllers/user.controller')

router.get('/',(req,res) => {
    myFunctions.userform(req,res);
});
router.post('/',(req,res) => {
    myFunctions.create(req,res);
});
router.get('/list',(req,res) => {
    myFunctions.findAll(req,res);
});
router.get("/update/:id" ,(req,res) => { 
    myFunctions.findUser(req,res);   
});
router.get("/delete/:id" ,(req,res) => { 
    myFunctions.delUser(req,res);    
});

module.exports=router;
