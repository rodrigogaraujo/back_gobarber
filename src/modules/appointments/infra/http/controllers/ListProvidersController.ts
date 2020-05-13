import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProvidersService from "@modules/appointments/services/ListProvidersService";

export default class ListProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProvidersService = container.resolve(ListProvidersService);

        const user_id = request.user.id;

        const appoiment = await listProvidersService.execute({
            user_id,
        });
        return response.json({ appoiment });
    }
}
