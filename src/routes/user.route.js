const express = require('express');
var router = express.Router();

var myFunctions=require('../controllers/user.controller')

router.get('/user/signin',(req,res) => {
    myFunctions.signin(req,res);
});

router.post('/user/authsign',(req,res) => {
    myFunctions.userauth(req,res);
});

router.get('/user/validatetoken',(req,res) => {
    myFunctions.validtoken(req,res);
});

router.get('/user/newuser',(req,res) => {
    myFunctions.userform(req,res);
});
router.post('/user/saveuser',(req,res) => {
    myFunctions.create(req,res);
});
router.get('/user/list',myFunctions.validtoken,  (req,res) => {
    myFunctions.findAll(req,res);
});
router.get("/user/update/:id" ,(req,res) => { 
    myFunctions.findUser(req,res);   
});
router.get("/user/delete/:id" ,(req,res) => { 
    myFunctions.delUser(req,res);    
});

module.exports=router;
