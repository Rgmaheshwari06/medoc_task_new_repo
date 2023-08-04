/*

for mysql workbench creation of database and table is as follows:
create database nodejs_login;
use nodejs_login;
create table users(
id int NOT NULL AUTO_INCREMENT,
name varchar(30),
salary int,
PRIMARY KEY(id)
);
INSERT INTO users(id,name,salary) values(1,'Rishabh',5300000),(2,'rahul',3400000), (3,'prateek',4500000);


*/


const { json } = require('body-parser');
const mysql = require('mysql2');

let mysqlConnection = mysql.createConnection({ // we can also use createpool inorder to perform multiple task parallely

host:'localhost',
user:'root',
password:''             /* enter your database password here */, 
database:'nodejs_login'
})

mysqlConnection.connect((err)=>{
if(err){
    console.log('error with DB connection'+ JSON.stringify(err,undefined,2));
}else{
    console.log('Db connected succesfully');
}
})

module.exports = mysqlConnection;