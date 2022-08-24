const mongoose = require('mongoose');
const User = mongoose.model('User');
const config= require('../config/.env')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// require('dotenv').config();
const dotenv = require('dotenv');
// const { validate } = require('../models/user.model');
dotenv.config();


async function signin(req,res) {
    await res.render('user/signin',{
        viewTitle :"Signin Form"
    });
}

async function userauth(req,res){
    User.findOne({name:'Johny'},(err,user)=> {
        if (err) {
            res.send("Error"+err);
            return;
        } 
        if (!user) {
            res.send("User not found" );
            return;
          }
          var token=jwt.sign({user:user},config.secret);
        
        res.json({jwt:token})
        
        // if (user.password==req.body.password){        
        // var token=jwt.sign({user:user},config.secret);        
        // res.json({jwt:token})              
        // }
        // else           
        //     {res.send("Invalid Password!"+ user.password+req.body.password);}           
       
    });
    }

async function validtoken(req,res,next) {
    
        let tokenHeaderKey = config.token_header_key;
        let jwtSecretKey = config.secret;
        const authheader = req.headers['authorization'];
        const token= authheader && authheader.split(' ')[1];
        console.log(token);                   
        if (!token) {
          return res.status(403).send({ message: "No token provided!" });
        }
            jwt.verify(token, jwtSecretKey, { expiresIn: '30s' }, (err, authdata) => {

        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: "User",
                authdata
            });
        }

    });
            // if(verified){
            //     return res.send("Successfully Verified");
            // }else{
            //     // Access Denied
            //     return res.status(401).send(error);

            // }
            next();
}

async function userform(req,res) {
    await res.render('user/addOrEdit',{
        viewTitle :"Insert User"
    });
}

function create(req,res) {      
    if (req.body._id==""){
        insertRecord(req,res);        
    }
    else {
       updateRecord(req,res);
    }
}

async function insertRecord(req,res) {
    var user = new User();
    user.name=req.body.name;
    user.password=req.body.password;
    // user.password=bcrypt.hashSync(req.body.password, 8);    
    user.age=req.body.age;
    user.phone=req.body.phone;
    user.email=req.body.email;
    await user.save((err,doc) => {
        if(!err) {
            res.redirect('user/list');
        } else {
            console.log("Error during insertion :"+err);
        }
    })

}
async function updateRecord(req,res) {
    await User.findOneAndUpdate({_id:req.body._id},req.body,{new:true}, (err,doc) => {
        if (!err) {
            res.redirect("user/list")}           
        else {
            console.log("Error in updating data :"+err)
        }
    })
}
async function findAll(req,res) {
    await User.find((err,docs) => {
        if (!err) {
            docs= docs.map(item=> item.toObject());
            res.render("user/list",{
            list:docs}); } 
        else {
        console.log("Error in fetching data :"+err)
    }
})
}

async function findUser(req,res) {
    await User.findById(req.params.id ,(err,doc)=> {
        if (!err) {
            doc= doc.toObject();
            res.render("user/addOrEdit",{
                viewTitle:"Update User",
                user:doc});
        } 
    })
    }

async function delUser(req,res) {
    await User.findByIdAndDelete(req.params.id ,(err,doc)=> {
        if (!err) {
            res.redirect("/user/list")}           
        else {
            console.log("Error in deleting user :"+err)
        }
    })
}    

module.exports= {
    signin,
    userauth,
    validtoken,
    userform,
    create,
    insertRecord,
    updateRecord,
    findAll,
    findUser,
    delUser
}