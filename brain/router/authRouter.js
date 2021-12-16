import { Router } from "express";
import authController from "../Controller/authController.js";
import authMiddleware from "../middlewaree/authMiddleware.js";
import roleMiddleware from "../middlewaree/roleMiddleware.js";

const AuthRouter = new Router()

AuthRouter.post('/registration', authController.registration)
AuthRouter.post('/login', authController.login)
AuthRouter.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
AuthRouter.get('/user-info/:token' , authController.getOne)
AuthRouter.get('/user-balance/:username', authController.checkBalance)
AuthRouter.get('/user/:id', authController.getUser)
AuthRouter.post('/update-user', authController.update)

export default AuthRouter;