import express from "express";
import { createUser, deleteUser, findAllUser, findOneUser, updateUser } from "./users.controller.js";

export const router = express.Router()

router.route("/")
    .get(findAllUser)
    .post(createUser)

router.route("/:id")
    .get(findOneUser)
    .patch(updateUser)
    .delete(deleteUser)
