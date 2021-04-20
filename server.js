const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors())
app.use(express.urlencoded({ extended: false   }));
app.use(express.json());
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mustical"
});

con.connect((err) => {
    if(err) throw err;
    console.log('connected');
})

app.post("/signUp",(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const password = req.body.password;

    //console.log(body);
    var sql= 'INSERT INTO user VALUES ("'+name+'","'+password+'");';
    
 
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                status: 400
            })
        }
        else {
            res.json({
                success: true,
                status: 200
            })
            console.log("uploaded");
        }
    })
})

app.post("/login",(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const password = req.body.password;
    var sql = 'SELECT * FROM user WHERE name="'+name+'" AND password="'+password+'" ;';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            console.log(result);
            res.json(result)
        }
    })
})

app.post("/list",(req,res)=>{
    console.log(req.body);
    const tag1 = req.body.tag1;
    const tag2 = req.body.tag2;
    const tag3 = req.body.tag3;
    const tag4 = req.body.tag4;
    const tag5 = req.body.tag5;
    const tag6 = req.body.tag6;
    const tag7 = req.body.tag7;

    console.log(tag1,tag2,tag3,tag4,tag5)
    // var sql = 'Select * FROM playlist WHERE tag="happy"'
    var sql = 'SELECT * FROM playlist WHERE tag="'+tag1+'" OR tag="'+tag2+'" OR tag="'+tag3+'" OR tag="'+tag4+'" OR tag="'+tag5+'" OR tag="'+tag6+'" OR tag="'+tag7+'";';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            console.log(result);
            res.json(result)
        }
    })
})

app.listen(process.env.PORT||8000);