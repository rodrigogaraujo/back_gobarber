import { injectable, inject } from "tsyringe";
import { getHours, isAfter } from "date-fns";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    avialable: boolean;
}>;

@injectable()
export default class ListProviderDayAviabilityService {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            { provider_id, year, day, month },
        );

        const hourStart = 8;
        const eachHourDay = Array.from(
            { length: 10 },
            (value, index) => index + hourStart,
        );

        const currentDate = new Date(Date.now());
        const availability = eachHourDay.map(hour => {
            const hasAppointmentHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );
            const compareDate = new Date(year, month - 1, day, hour);
            return {
                hour,
                avialable:
                    !hasAppointmentHour && isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}
