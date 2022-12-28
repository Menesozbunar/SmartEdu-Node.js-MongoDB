import  express  from "express";
import connDb from './db.js';
import session from "express-session";
import MongoStore from 'connect-mongo'
import pageRoute from "./routers/pageRouter.js"

import flash from"connect-flash"
import courseRoute from "./routers/courseRoute.js"
import categoryRoute from "./routers/categoryRoute.js"
import userRoute from "./routers/userRoute.js"
import * as dotenv from "dotenv";

const app=express();
dotenv.config()
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.Db_Uri})
  }))
  global.userIN=null;
  app.use(flash());
  app.use((req,res,next)=>{
    res.locals.flashMessages=req.flash();
    next();
  })

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

connDb();
app.use(`*`,(req,res,next)=>{
    userIN=req.session.userID;
    next();
})
 app.use (`/`,pageRoute);
 app.use (`/courses`,courseRoute);
 app.use (`/category`,categoryRoute);
 app.use (`/user`,userRoute);







app.listen(process.env.port,()=>{
    console.log(`uygulama baslatildi PORT:${process.env.port}`);
})