import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js"



const app = express();


app.use(express.json())


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    if(connectDB){
    console.log(`app is live on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
    }
});