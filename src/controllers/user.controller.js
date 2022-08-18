const mongoose = require('mongoose');
const User = mongoose.model('User');

function userform(req,res) {
    res.render('user/addOrEdit',{
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

function insertRecord(req,res) {
    var user = new User();
    user.name=req.body.name;
    user.age=req.body.age;
    user.phone=req.body.phone;
    user.email=req.body.email;
    user.save((err,doc) => {
        if(!err) {
            res.redirect('user/list');
        } else {
            console.log("Error during insertion :"+err);
        }
    })

}
function updateRecord(req,res) {
    User.findOneAndUpdate({_id:req.body._id},req.body,{new:true}, (err,doc) => {
        if (!err) {
            res.redirect("user/list")}           
        else {
            console.log("Error in updating data :"+err)
        }
    })
}
function findAll(req,res) {
    User.find((err,docs) => {
        if (!err) {
            docs= docs.map(item=> item.toObject());
            res.render("user/list",{
            list:docs}); } 
        else {
        console.log("Error in fetching data :"+err)
    }
})
}

function findUser(req,res) {
    User.findById(req.params.id ,(err,doc)=> {
        if (!err) {
            doc= doc.toObject();
            res.render("user/addOrEdit",{
                viewTitle:"Update User",
                user:doc});
        } 
    })
    }

function delUser(req,res) {
    User.findByIdAndDelete(req.params.id ,(err,doc)=> {
        if (!err) {
            res.redirect("/user/list")}           
        else {
            console.log("Error in deleting user :"+err)
        }
    })
}    

module.exports= {
    userform,
    create,
    insertRecord,
    updateRecord,
    findAll,
    findUser,
    delUser
}