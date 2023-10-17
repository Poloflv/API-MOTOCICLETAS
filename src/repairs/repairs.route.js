import express from "express";
import { createRepair, deleteRepair, findAllRepair, findOneRepair, updateRepair } from "./repairs.controller.js";
import { protect, restricTo } from "../users/users.middleware.js";

export const router = express.Router()

router.route("/")
    .get(protect, restricTo('empleado'),findAllRepair ) //este
    .post(createRepair)

router.route("/:id")
    .get(protect, restricTo('empleado'),findOneRepair ) //este
    .patch(protect, restricTo('empleado'),updateRepair ) //este
    .delete(protect, restricTo('empleado'),deleteRepair ) //este

