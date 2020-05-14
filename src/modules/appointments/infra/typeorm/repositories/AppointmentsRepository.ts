import { Repository, getRepository, Raw } from "typeorm";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindInMonthFromProviderDTO from "@modules/appointments/dtos/IFindInMonthFromProviderDTO";
import IFindInDayFromProviderDTO from "@modules/appointments/dtos/IFindInDayFromProviderDTO";

class AppoimentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findAllInMonthFromProvider({
        provider_id,
        year,
        month,
    }: IFindInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, "0");
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}), 'MM-YYYY' = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        year,
        month,
    }: IFindInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, "0");
        const parsedMonth = String(month).padStart(2, "0");
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}), 'DD-MM-YYYY' = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });
        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: {
                date,
            },
        });
        return findAppointment || undefined;
    }
}

export default AppoimentsRepository;
