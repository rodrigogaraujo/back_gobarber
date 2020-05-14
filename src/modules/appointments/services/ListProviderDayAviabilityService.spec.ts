import FakesAppointmentsRepository from "@modules/appointments/repositories/fakes/FakesAppointmentsRepository";
import ListProviderDayAviabilityService from "./ListProviderDayAviabilityService";

let fakeCreate: FakesAppointmentsRepository;
let listProviders: ListProviderDayAviabilityService;

describe("ListProviderDayAviability", () => {
    beforeEach(() => {
        fakeCreate = new FakesAppointmentsRepository();
        listProviders = new ListProviderDayAviabilityService(fakeCreate);
    });
    it("should be able to list the day aviability from provider", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11, 0, 0).getTime();
        });
        await fakeCreate.create({
            provider_id: "user",
            user_id: "user",
            date: new Date(2020, 4, 20, 12, 0, 0),
        });
        const aviability = await listProviders.execute({
            provider_id: "user",
            day: 20,
            year: 2020,
            month: 5,
        });

        expect(aviability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 13, available: true },
            ]),
        );
    });
});
