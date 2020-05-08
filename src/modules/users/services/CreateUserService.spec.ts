import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import AppError from "@shared/erros/AppError";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
    it("should be able to create a new user", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(fakeCreate, fakeHash);

        const user = await createUser.execute({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231231",
        });

        expect(user).toHaveProperty("id");
    });

    it("should not be able to create a new user with same email from another", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(fakeCreate, fakeHash);

        await createUser.execute({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231231",
        });

        expect(
            createUser.execute({
                name: "John Doe",
                email: "rodrigoaraujo990@gmail.com",
                password: "1231231",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
