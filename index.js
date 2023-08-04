const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// use postman for testing the api's


// fetching data from mysql database;
// get request ==  for fetching data from somewhere but does not mean to secure. 
app.get('/users',(req,res)=>{
    connection.query('SELECT * FROM users',(err,rows)=>{
        if(err){
            console.log(err);}
            else{
                console.log('successfully connected to database :: -> ');
                // console.log(rows);
                res.send(rows);
            }
    })
})


// delete method == this method is used to delete the data from the database.

app.delete('/users/:id',(req,res)=>{
    // param is used to fetch the data from the url.
    connection.query('DELETE FROM users WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err);}
            else{
                console.log('successfully connected to database :: -> ');
                res.send(rows);
            }
    })
})

// post method == this method is used to insert the data into the database.
// experiment done using postman
app.post('/users/insert',(req,res)=>{
    // req.body is used to fetch the data from the body of the request.

    let data = [req.body.name,req.body.salary];
    
    // we can create the above statement like 
    // let data = [req.body];
    // let insertedData = [data.name,data.salary];


    connection.query('INSERT INTO users (name , salary) value(?)',[data /*insertedData*/],(err,rows)=>{
        if(err){
            console.log(err);}
            else{
                console.log('successfully connected to database :: -> ');
                res.send(rows);
            }
    })
})


//patch request == this request is used to update the data in the database. (for light request like update the name etc)
// put request == this request is also used to update the data in the database. (for heavy request like update the whole data);



app.patch('/users/update/:id',(req,res)=>{ // this url may contain error 
    let data = req.body;
    connection.query('UPDATE users SET ? WHERE id=?'+data.id,[data],(err,rows)=>{
        if(err){
            console.log(err);}
            else{
                console.log('successfully connected to database :: -> ');
                res.send(rows);
            }
    })
})


// this is the put request which is used to update the data in the database. is data is not found then it will insert the data into the database.
app.put('/users/update&insert/',(req,res)=>{ // this url may contain error 
    let data = req.body;
    connection.query('UPDATE users SET ? WHERE id=?'+data.id,[data],(err,rows)=>{
        if(err){
            console.log(err);}
            else{
                console.log('successfully connected to database :: -> ');
                if(rows.affectedRows == 0){
                    let data = [req.body];
                    let insertedData = [data.name,data.salary];
                    connection.query('INSERT INTO users (name , salary) value(?)',[insertedData],(err,rows)=>{
                    if(err){
                        console.log(err);}
                        else{
                        console.log('successfully connected to database :: -> ');
                        res.send(rows);
                        }}) 
                }else{res.send(rows);}
            }
    })
})





app.listen(3000,()=>{
    console.log('server is listening on port 3000');
})
