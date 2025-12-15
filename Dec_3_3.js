import mysql from 'mysql';
import dotenv from 'dotenv';
import express from 'express';

import { getUsers,getUserById,getUserByCity, AddUser, updatePhone, DeleteUser } from './mysqlRoute.js';

const app = express();
app.use(express.json());

dotenv.config();

var connection  = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DB
});

connection.connect((err)=>{
    if(err){
        console.log('Error in Connection',err.message);
    }
    else{
        console.log('DB Connected');
    }
})

app.get('/api/users',getUsers);
app.get("/api/users/:id",getUserById);
app.get("/api/users/city/:city",getUserByCity);
app.post("/api/users/add",AddUser);
app.put('/api/users/updatePhone/:id',updatePhone);
app.delete("/api/users/:id",DeleteUser);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default connection;