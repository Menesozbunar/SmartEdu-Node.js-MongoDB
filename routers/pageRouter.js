import  express  from "express";
import * as pageController from "../controllers/pageController.js"
import  * as userMiddleware from "../middleware/userMiddleware.js"
const router=express.Router();

router.route(`/`).get(pageController.getIndexPage);
router.route(`/about`).get(pageController.getAboutPage);
router.route(`/login`).get(userMiddleware.checkLoginRegister,pageController.getLoginPage);
router.route(`/reg`).get(userMiddleware.checkLoginRegister,pageController.getRegisterPage);
router.route(`/contact`).get(pageController.getContactPage);

router.route(`/contact`).post(pageController.sendEmail);


export default router;