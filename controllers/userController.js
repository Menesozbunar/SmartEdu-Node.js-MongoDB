import bcrypt from "bcrypt";
import Category from "../models/Category.js"
import User from "../models/user.js"
import Course from "../models/Courses.js"



const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).redirect(`/login`)
    } catch (error) { res.status(200).json({ status: `fail`, error }) }
}


const loginUser = async (req, res) => {
    try {
        const {email,password}=req.body
        console.log("req body e mail:"+email);
        console.log("req body password:"+password);
        const user =await User.findOne({email})
        let same=false;
        if(user){
            same= await bcrypt.compare(password, user.password)
        }else{
           res.status(401).json({
            succeded:false,
            error:"bu mail adrei yok databasede"
           })
        }
        if(same){
            req.session.userID=user._id;
            res.status(200).redirect(`/user/dashboard`);
        }else{
            res.status(401).json({
                succeded:false,
                error:"bu şifre yok databasede şifre yanlis"
               })}
        } catch (error) {
        res.status(400),
        error
    }
}


const logoutUser=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect(`/`);
    })
}

const getDashboardPage =async(req,res)=>{
    const user =await User.findOne({_id:req.session.userID}).populate(`courses`)
    const category =await Category.find();  
    const courses=await Course.find({user:req.session.userID})
    res.status(200).render(`dashboard`,{page_name:`dashboard`,user,category,courses})
}


export { createUser ,loginUser ,logoutUser,getDashboardPage}