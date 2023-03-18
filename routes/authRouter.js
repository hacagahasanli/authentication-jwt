import { Router } from "express";
import authController from "../controller/authController.js";
import { usernameAndPasswordValidation } from "../middleware/validationMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

const router = new Router();

router.post('/registration', usernameAndPasswordValidation, authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(["ADMIN"]), authController.getUsers)

export { router }