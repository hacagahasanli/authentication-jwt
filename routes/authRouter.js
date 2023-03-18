import { Router } from "express";
import authController from "../controller/authController.js";

const router = new Router();

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/users', authController.getUsers)

export { router }