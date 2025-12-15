import dotenv from "dotenv";

const obj = dotenv.config();

if(obj.error){
    throw obj.error;
}
else{
    console.log(obj.parsed);
}