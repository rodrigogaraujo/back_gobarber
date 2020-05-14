import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderMonthAviabilityService from "@modules/appointments/services/ListProviderMonthAviabilityService";

export default class ProviderMonthAviabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProvidersMonthService = container.resolve(
            ListProviderMonthAviabilityService,
        );

        const { provider_id } = request.params;
        const { month, year } = request.body;

        const aviability = await listProvidersMonthService.execute({
            provider_id,
            month,
            year,
        });
        return response.json(aviability);
    }
}
