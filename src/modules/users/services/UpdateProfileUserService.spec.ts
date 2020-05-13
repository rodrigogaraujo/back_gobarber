import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileUser from "./UpdateProfileUserService";

let fakeCreate: FakesUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateProfileUser;

describe("UpdateProfile", () => {
    beforeEach(() => {
        fakeCreate = new FakesUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateUser = new UpdateProfileUser(fakeCreate, fakeHashProvider);
    });
    it("should be able to update profile", async () => {
        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        const updateUserN = await updateUser.execute({
            user_id: user.id,
            email: "rodrigo@gmail.com",
            name: "Rodrigo",
        });

        expect(updateUserN?.email).toBe("rodrigo@gmail.com");
    });
    it("should not be able to change email with another email", async () => {
        await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        const user1 = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo9990@gmail.com",
            password: "1231",
        });
        await expect(
            updateUser.execute({
                user_id: user1.id,
                email: "rodrigoaraujo990@gmail.com",
                name: "Rodrigo",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update password", async () => {
        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        const updateUserN = await updateUser.execute({
            user_id: user.id,
            email: "rodrigo@gmail.com",
            name: "Rodrigo",
            old_password: "1231",
            password: "123123123",
        });

        expect(updateUserN?.password).toBe("123123123");
    });

    it("should no be able to update password without old-password", async () => {
        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        await expect(
            updateUser.execute({
                user_id: user.id,
                email: "rodrigo@gmail.com",
                name: "Rodrigo",
                password: "123123123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should no be able to update password with wrong old-password", async () => {
        const user = await fakeCreate.create({
            name: "John Doe",
            email: "rodrigoaraujo990@gmail.com",
            password: "1231",
        });
        await expect(
            updateUser.execute({
                user_id: user.id,
                email: "rodrigo@gmail.com",
                name: "Rodrigo",
                password: "123123123",
                old_password: "121123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
