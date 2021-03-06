import { startOfHour, isBefore, getHours, format } from "date-fns";
import { injectable, inject } from "tsyringe";

import Appoiment from "@modules/appointments/infra/typeorm/entities/Appointment";
import AppError from "@shared/erros/AppError";
import INotificationRepository from "@modules/notifications/repositories/INotificationsRepository";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

@injectable()
class CreateAppoimentService {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,

        @inject("NotificationsRepository")
        private notificationsRepository: INotificationRepository,
    ) {}

    public async execute({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appoiment> {
        const dateParsed = startOfHour(date);

        if (isBefore(dateParsed, Date.now())) {
            throw new AppError("Essa horário já passou...");
        }

        if (provider_id === user_id) {
            throw new AppError(
                "Você não pode cadastrar um agendamento com você mesmo",
            );
        }

        if (getHours(dateParsed) < 8 || getHours(dateParsed) > 17) {
            throw new AppError(
                "Você não pode cadastrar um agendamento antes das 8h e depois das 17h",
            );
        }

        const dateExists = await this.appointmentsRepository.findByDate(
            dateParsed,
        );

        if (dateExists) {
            throw new AppError("Essa horário já foi preenchido");
        }

        const appoiment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: dateParsed,
        });

        const dateFormated = format(dateParsed, "dd/MM/yyyy 'ás' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormated}`,
        });
        return appoiment;
    }
}

export default CreateAppoimentService;
