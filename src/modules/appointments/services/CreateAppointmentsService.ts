import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";

import Appoiment from "@modules/appointments/infra/typeorm/entities/Appointment";
import AppError from "@shared/erros/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

@injectable()
class CreateAppoimentService {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appoiment> {
        const dateParsed = startOfHour(date);

        const dateExists = await this.appointmentsRepository.findByDate(
            dateParsed,
        );

        if (dateExists) {
            throw new AppError("Essa horário já foi preenchido");
        }

        const appoiment = await this.appointmentsRepository.create({
            provider_id,
            date: dateParsed,
        });
        return appoiment;
    }
}

export default CreateAppoimentService;
