import  express  from "express";
import * as userController from "../controllers/userController.js"
import  * as userMiddleware from "../middleware/userMiddleware.js"


const router=express.Router(); 

router.route(`/signup`).post(userController.createUser);
router.route(`/login`).post(userController.loginUser);
router.route(`/logout`).get(userController.logoutUser);
router.route(`/dashboard`).get(userMiddleware.checkLoginDashboard,userController.getDashboardPage);

export default router;
