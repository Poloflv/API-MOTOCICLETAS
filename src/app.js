import  express from "express";

import { router } from "./routes/routes.js";
import { AppError } from "./errors/appError.js";

import { globalErrorHandle } from "./errors/error.controller.js";
import { envs } from "./config/enviroments/enviroments.js";
import { enableMorgan } from "./config/plugins/morgan.plugin.js";
import { enableCors } from "./config/plugins/cors.plugin.js";

const app = express();

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:3001', 'http://localhost:3000','http://localhost:5173']

app.use(express.json());

if(envs.NODE_ENV ==='development'){
    enableMorgan(app)
}

enableCors(app, ACCEPTED_ORIGINS)

app.use('/api/v1', router )

app.all('*',(req,res,next) => {

    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})

app.use(globalErrorHandle)

export default app;