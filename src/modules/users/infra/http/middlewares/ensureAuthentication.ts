import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from "@shared/erros/AppError";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthentication(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("O usuário não está logado ou não é valido", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError("O usuário não está logado ou não é valido", 401);
    }
}
