import FakesAppointmentsRepository from "@modules/appointments/repositories/fakes/FakesAppointmentsRepository";
import ListProviderMonthAviabilityService from "./ListProviderMonthAviabilityService";

let fakeCreate: FakesAppointmentsRepository;
let listProviders: ListProviderMonthAviabilityService;

describe("ListProviderMonthAviability", () => {
    beforeEach(() => {
        fakeCreate = new FakesAppointmentsRepository();
        listProviders = new ListProviderMonthAviabilityService(fakeCreate);
    });
    it("should be able to list the month aviability from provider", async () => {
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 8, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 9, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 10, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 11, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 12, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 13, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 14, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 15, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 16, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 20, 17, 0, 0),
            user_id: "user",
        });
        await fakeCreate.create({
            provider_id: "user",
            date: new Date(2020, 4, 21, 9, 0, 0),
            user_id: "user",
        });
        const aviability = await listProviders.execute({
            provider_id: "user",
            year: 2020,
            month: 5,
        });

        expect(aviability).toEqual(
            expect.arrayContaining([
                { day: 20, available: false },
                { day: 21, available: true },
            ]),
        );
    });
});
