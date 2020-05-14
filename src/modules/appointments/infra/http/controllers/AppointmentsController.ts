import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
import CreateAppoimentService from "@modules/appointments/services/CreateAppointmentsService";

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createAppoimentService = container.resolve(
            CreateAppoimentService,
        );
        const user_id = request.user.id;
        const { provider_id, date } = request.body;
        const dateParsed = parseISO(date);

        const appoiment = await createAppoimentService.execute({
            provider_id,
            user_id,
            date: dateParsed,
        });
        return response.json({ appoiment });
    }
}
