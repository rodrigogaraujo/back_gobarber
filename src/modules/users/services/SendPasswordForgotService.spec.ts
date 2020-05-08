import FakesUsersRepository from "@modules/users/repositories/fakes/FakesUsersRepository";
import FakeEmailProvider from "@shared/container/providers/MailProvider/fakes/FakeEmailProvider";
import AppError from "@shared/erros/AppError";
import SendPasswordForgotService from "./SendPasswordForgotService";

describe("SendPasswordForgot", () => {
    it("should be able to recover the password using your email", async () => {
        const fakeCreate = new FakesUsersRepository();
        const fakeMail = new FakeEmailProvider();
        const recoverPass = new SendPasswordForgotService(fakeCreate, fakeMail);

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
        const fakeCreate = new FakesUsersRepository();
        const fakeMail = new FakeEmailProvider();
        const recoverPass = new SendPasswordForgotService(fakeCreate, fakeMail);

        await expect(
            recoverPass.execute({
                email: "rodrigoaraujo990@gmail.com",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
