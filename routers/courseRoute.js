import  express  from "express";
import * as courseController from "../controllers/courseController.js"
import * as roleMiddleware from "../middleware/roleMiddleware.js"
const router=express.Router(); 

router.route(`/`).post(roleMiddleware.userRoleCheck(["teacher","admin"]),courseController.createCourse);
router.route(`/`).get(courseController.getAllCourses);

router.route(`/:slug`).get(courseController.getCourse);
router.route(`/enroll`).post(courseController.enrollCourse);
router.route(`/release`).post(courseController.releaseCourse);
export default router;
