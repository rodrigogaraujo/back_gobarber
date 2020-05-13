import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear } from "date-fns";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindInMonthFromProviderDTO from "@modules/appointments/dtos/IFindInMonthFromProviderDTO";

class AppoimentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        Object.assign(appointment, { id: uuid(), provider_id, date });

        this.appointments.push(appointment);

        return appointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointmentsFromMonth = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointmentsFromMonth;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );
        return findAppointment;
    }
}

export default AppoimentsRepository;
