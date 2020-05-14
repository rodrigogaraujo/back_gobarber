import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderDayAviabilityService from "@modules/appointments/services/ListProviderDayAviabilityService";

export default class ProviderDayAviabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProvidersDayService = container.resolve(
            ListProviderDayAviabilityService,
        );
        const { provider_id } = request.params;
        const { month, year, day } = request.body;

        const aviability = await listProvidersDayService.execute({
            provider_id,
            month,
            year,
            day,
        });
        return response.json(aviability);
    }
}
