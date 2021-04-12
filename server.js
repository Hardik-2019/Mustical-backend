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

app.listen(process.env.PORT||8000);