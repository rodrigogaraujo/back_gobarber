import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import Appoiment from "../infra/typeorm/entities/Appointment";

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
export default class ListProviderAppointmentService {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
        day,
    }: IRequest): Promise<Appoiment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            { provider_id, year, month, day },
        );
        return appointments;
    }
}
