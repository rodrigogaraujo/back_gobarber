import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";

import uploadConfig from "@config/upload";
import AppError from "@shared/erros/AppError";
import routes from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static(uploadConfig.uploadsFolder));

app.use(errors);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.code).json({
            status: "error",
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: err.message,
    });
});

app.listen(3333);
