import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSessionsService from "@modules/users/services/CreateSessionsService";

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const sessionService = container.resolve(CreateSessionsService);
        const { user, token } = await sessionService.execute({
            email,
            password,
        });
        delete user.password;
        return response.json({ user, token });
    }
}
