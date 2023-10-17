import express from "express";
import { createUser, deleteUser, findAllUser, findOneUser, login, register, updateUser } from "./users.controller.js";
import { protect, protectAccountOwner, restricTo, validateExistUser } from "./users.middleware.js";

export const router = express.Router()

router.post('/login', login)

router,post('/register', register)

//TODO: hacer la logica de programacion de la parte de change-password

router.route("/")
    .get(findAllUser)
    .post(createUser)

router.route("/:id")
    .get(findOneUser)
    .patch(updateUser)
    .delete(protect,restricTo('jefe','empleado'),validateExistUser,protectAccountOwner,deleteUser)
    // .delete(deleteUser)

