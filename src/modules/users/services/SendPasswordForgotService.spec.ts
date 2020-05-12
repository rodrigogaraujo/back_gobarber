import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import FakeEmailProvider from "@shared/container/providers/MailProvider/fakes/FakeEmailProvider";
import AppError from "@shared/erros/AppError";
import SendPasswordForgotService from "./SendPasswordForgotService";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";

let fakeCreate: FakesUsersRepository;
let fakeMail: FakeEmailProvider;
let fakeUserToken: FakeUserTokenRepository;
let recoverPass: SendPasswordForgotService;

describe("SendPasswordForgot", () => {
    beforeEach(() => {
        fakeCreate = new FakesUsersRepository();
        fakeMail = new FakeEmailProvider();
        fakeUserToken = new FakeUserTokenRepository();
        recoverPass = new SendPasswordForgotService(
            fakeCreate,
            fakeMail,
            fakeUserToken,
        );
    });
    it("should be able to recover the password using your email", async () => {
        const sendForgot = jest.spyOn(fakeMail, "sendMail");

        await fakeCreate.create({
            name: "Rodrigo",
            email: "rodrigoaraujo990@gmail.com",
            password: "123123",
        });

        await recoverPass.execute({
            email: "rodrigoaraujo990@gmail.com",
        });

        expect(sendForgot).toHaveBeenCalled();
    });

    it("should not be able to recover ", async () => {
        await expect(
            recoverPass.execute({
                email: "rodrigoaraujo990@gmail.com",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to generate a forget password token", async () => {
        const fakeUserTokenRepository = new FakeUserTokenRepository();

        const generateToken = jest.spyOn(fakeUserTokenRepository, "generate");

        const user = await fakeCreate.create({
            name: "Rodrigo",
            email: "rodrigoaraujo990@gmail.com",
            password: "123123",
        });

        await recoverPass.execute({
            email: "rodrigoaraujo990@gmail.com",
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
