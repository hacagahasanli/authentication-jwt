import { Router } from "express";
import authController from "../controller/authController.js";
import { usernameAndPasswordValidation } from "../middleware/validationMiddleware.js";

const router = new Router();

router.post('/registration', usernameAndPasswordValidation, authController.registration)
router.post('/login', authController.login)
router.get('/users', authController.getUsers)

export { router }