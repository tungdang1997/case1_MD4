import express from 'express';
import {router} from "./src/router/router";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload'
import * as mongoose from "mongoose";

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/case_01').then(()=>{
    console.log('success')
})
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use('', router)



app.listen(3000, ()=>{
    console.log(`server is running`)
})