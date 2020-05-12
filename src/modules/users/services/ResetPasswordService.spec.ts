import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import AppError from "@shared/erros/AppError";
import ResetPasswordService from "./ResetPasswordService";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import IHashProvider from "../providers/HashProvider/modules/IHashProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let fakeCreate: FakesUsersRepository;
let fakeUserToken: FakeUserTokenRepository;
let resetPass: ResetPasswordService;
let hashProvider: IHashProvider;

describe("ResetPasswordService", () => {
    beforeEach(() => {
        fakeCreate = new FakesUsersRepository();
        fakeUserToken = new FakeUserTokenRepository();
        hashProvider = new FakeHashProvider();
        resetPass = new ResetPasswordService(
            fakeCreate,
            fakeUserToken,
            hashProvider,
        );
    });
    it("should be able to reset the password", async () => {
        const user = await fakeCreate.create({
            name: "Rodrigo",
            email: "rodrigoaraujo990@gmail.com",
            password: "123123",
        });

        const { token } = await fakeUserToken.generate(user.id);

        const generateHash = jest.spyOn(hashProvider, "generateHash");

        await resetPass.execute({
            password: "123456",
            token,
        });

        const userPass = await fakeCreate.findById(user.id);

        await expect(generateHash).toHaveBeenCalledWith("123456");
        await expect(userPass?.password).toBe("123456");
    });

    it("should not be able to reset the password without token", async () => {
        await expect(
            resetPass.execute({ password: "123123", token: "not-exists" }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to reset the password without user", async () => {
        const { token } = await fakeUserToken.generate("non-exists-user");
        await expect(
            resetPass.execute({ password: "123123", token }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to reset the password if passed more then two hours", async () => {
        const user = await fakeCreate.create({
            name: "Rodrigo",
            email: "rodrigoaraujo990@gmail.com",
            password: "123123",
        });

        const { token } = await fakeUserToken.generate(user.id);
        jest.spyOn(Date, "now").mockImplementation(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPass.execute({
                password: "123456",
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
