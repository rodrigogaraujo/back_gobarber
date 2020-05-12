import { Request, Response } from "express";
import { container } from "tsyringe";

import SendPasswordForgotService from "@modules/users/services/SendPasswordForgotService";

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;
        const sendForgotPassword = container.resolve(SendPasswordForgotService);
        await sendForgotPassword.execute({
            email,
        });
        return response.status(204).json();
    }
}
