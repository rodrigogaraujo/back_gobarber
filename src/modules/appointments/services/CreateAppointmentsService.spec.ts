import FakesAppointmentsRepository from "@modules/appointments/repositories/fakes/FakesAppointmentsRepository";
import AppError from "@shared/erros/AppError";
import CreateAppoimentService from "./CreateAppointmentsService";

describe("CreateAppointment", () => {
    it("should be able to create a new appointment", async () => {
        const fakeCreate = new FakesAppointmentsRepository();
        const createAppointment = new CreateAppoimentService(fakeCreate);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: "123123",
        });

        expect(appointment).toHaveProperty("id");
    });

    it("should not be able to create two appointments on the same time", async () => {
        const fakeCreate = new FakesAppointmentsRepository();
        const createAppointment = new CreateAppoimentService(fakeCreate);

        await createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: "123123",
        });
        expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: "123123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
