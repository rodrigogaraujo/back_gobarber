import { injectable, inject } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    avialable: boolean;
}>;

@injectable()
export default class ListProviderMonthAviabilityService {
    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointmentsInMonth = await this.appointmentsRepository.findAllInMonthFromProvider(
            { provider_id, month, year },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const eachDayMonth = Array.from(
            { length: numberOfDaysInMonth },
            (value, index) => index + 1,
        );

        const availability = eachDayMonth.map(day => {
            const appointmentsInDay = appointmentsInMonth.filter(
                appointment => {
                    return getDate(appointment.date) === day;
                },
            );
            return {
                day,
                avialable: appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}
