import express from 'express';
import {router} from "./src/router/router";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload'
import * as mongoose from "mongoose";
import session from 'express-session';
import { Cookie } from "express-session";
import {AppDataSource} from "./src/data-source";

const app = express();
mongoose.set('strictQuery', true);
AppDataSource.initialize().then(()=>{
    console.log('ok ok')
})
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'Tung',
    cookie: { maxAge: 60000 }}));
app.use('', router)



app.listen(3000, ()=>{
    console.log(`server is running`)
})