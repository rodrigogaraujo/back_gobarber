import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeCreate: FakesUsersRepository;
let listProviders: ListProvidersService;

describe("ListProviders", () => {
    beforeEach(() => {
        fakeCreate = new FakesUsersRepository();
        listProviders = new ListProvidersService(fakeCreate);
    });
    it("should be able to show providers", async () => {
        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });

        const user2 = await fakeCreate.create({
            name: "John Doe1",
            email: "rodrigoaraujo9920@gmail.com",
            password: "1231",
        });

        const user3 = await fakeCreate.create({
            name: "John Doe2",
            email: "rodrigoaraujo99220@gmail.com",
            password: "1231",
        });
        const listProvider = await listProviders.execute({ user_id: user.id });

        expect(listProvider).toEqual([user2, user3]);
    });
});
