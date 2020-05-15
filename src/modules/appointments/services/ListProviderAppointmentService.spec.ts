import FakesAppointmentsRepository from "@modules/appointments/repositories/fakes/FakesAppointmentsRepository";
import ListProviderAppointmentService from "./ListProviderAppointmentService";

let fakeCreate: FakesAppointmentsRepository;
let listAppointments: ListProviderAppointmentService;

describe("ListProviderAppointments", () => {
    beforeEach(() => {
        fakeCreate = new FakesAppointmentsRepository();
        listAppointments = new ListProviderAppointmentService(fakeCreate);
    });
    it("should be able to list the appointments by id provider by day", async () => {
        const appointment1 = await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 21, 8, 0, 0),
            user_id: "user",
        });
        const appointment2 = await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 21, 9, 0, 0),
            user_id: "user",
        });
        const aviability = await listAppointments.execute({
            provider_id: "user",
            year: 2020,
            month: 5,
            day: 21,
        });

        expect(aviability).toEqual([appointment1, appointment2]);
    });
});
