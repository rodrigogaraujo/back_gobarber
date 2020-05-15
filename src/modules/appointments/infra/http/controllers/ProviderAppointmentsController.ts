import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderAppoimentService from "@modules/appointments/services/ListProviderAppointmentService";

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProviderAppoimentService = container.resolve(
            ListProviderAppoimentService,
        );
        const provider_id = request.user.id;
        const { day, month, year } = request.body;

        const appoiments = await listProviderAppoimentService.execute({
            provider_id,
            day,
            month,
            year,
        });
        return response.json(appoiments);
    }
}
