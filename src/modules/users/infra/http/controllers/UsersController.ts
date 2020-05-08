import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "@modules/users/services/CreateUserService";

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const userService = container.resolve(CreateUserService);
            const { name, email, password } = request.body;
            const user = await userService.execute({ name, email, password });
            delete user.password;
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
