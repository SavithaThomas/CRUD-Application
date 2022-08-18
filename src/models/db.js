const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/userdb",{useNewUrlParser:true},(err)=> {
    if (!err) {console.log('Mongodb Connection Succeeded')}
    else {console.log('error'+err)}
});

require('./user.model')