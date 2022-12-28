import User from "../models/user.js"

 const checkLoginDashboard= async(req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) return res.redirect("/login");
    next();
  };

  const checkLoginRegister=(req,res,next)=>{
    if(req.session.userID)return res.redirect("/")
     
  next();
  };
  export {checkLoginDashboard,checkLoginRegister}