import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/erros/AppError";
import CreateSessionsService from "./CreateSessionsService";
import CreateUserService from "./CreateUserService";

describe("SessionUser", () => {
    it("should be able to create a new session", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeCreate, fakeHashProvider);

        await createUser.execute({
            name: "John Doe",
            email: "rodrigo1@gmail.com",
            password: "1234",
        });

        const createSession = new CreateSessionsService(
            fakeCreate,
            fakeHashProvider,
        );

        const user1 = await createSession.execute({
            email: "rodrigo1@gmail.com",
            password: "1234",
        });

        expect(user1).toHaveProperty("token");
    });

    it("should not be able to create a new session ", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createSession = new CreateSessionsService(
            fakeCreate,
            fakeHashProvider,
        );

        expect(
            createSession.execute({
                email: "rodrigo1@gmail.com",
                password: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new session with wrong password", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeCreate, fakeHashProvider);

        await createUser.execute({
            name: "John Doe",
            email: "rodrigo1@gmail.com",
            password: "1234",
        });

        const createSession = new CreateSessionsService(
            fakeCreate,
            fakeHashProvider,
        );

        expect(
            createSession.execute({
                email: "rodrigo1@gmail.com",
                password: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
