import express from "express";

import { router as userRouter } from './../users/users.route.js'
import { router as repairRouter } from './../repairs/repairs.route.js'

export const router = express.Router();

router.use('/users', userRouter);
router.use('/repairs', repairRouter)