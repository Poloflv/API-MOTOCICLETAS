import express from "express";
import { createRepair, deleteRepair, findAllRepair, findOneRepair, updateRepair } from "./repairs.controller.js";

export const router = express.Router()

router.route("/")
    .get(findAllRepair)
    .post(createRepair)

router.route("/:id")
    .get(findOneRepair)
    .patch(updateRepair)
    .delete(deleteRepair)
