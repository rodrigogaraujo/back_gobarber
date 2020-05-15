import FakesAppointmentsRepository from "@modules/appointments/repositories/fakes/FakesAppointmentsRepository";
import FakeNotificationRepository from "@modules/notifications/repositories/fakes/FakeNotificationRepository";
import AppError from "@shared/erros/AppError";
import CreateAppoimentService from "./CreateAppointmentsService";

let fakeCreateAppointment: FakesAppointmentsRepository;
let fakeCreateNotification: FakeNotificationRepository;
let createAppointment: CreateAppoimentService;

describe("CreateAppointment", () => {
    beforeEach(() => {
        fakeCreateAppointment = new FakesAppointmentsRepository();
        fakeCreateNotification = new FakeNotificationRepository();
        createAppointment = new CreateAppoimentService(
            fakeCreateAppointment,
            fakeCreateNotification,
        );
    });
    it("should be able to create a new appointment", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: "123",
            provider_id: "123123",
        });

        expect(appointment).toHaveProperty("id");
    });

    it("should not be able to create two appointments on the same time", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: "123123",
            user_id: "123",
        });
        expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: "123123",
                user_id: "123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create appointment on a past date", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: "123123",
                user_id: "123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment on user same provider", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: "123123",
                user_id: "123123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment outside the available hours", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                provider_id: "123",
                user_id: "123123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
