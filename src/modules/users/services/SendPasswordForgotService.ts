import { injectable, inject } from "tsyringe";
import path from "path";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/erros/AppError";
import IUsersRepositorys from "../repositories/IUsersRepositories";
import IUserTokenRepository from "../repositories/IUserTokenRepository";

interface IRequest {
    email: string;
}

@injectable()
export default class SendPasswordForgotService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,
        @inject("MailProvider")
        private mailProvider: IMailProvider,
        @inject("UserToken")
        private userTokenRepository: IUserTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email não cadastrado em nossa base de dados");
        }

        const { token } = await this.userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            "..",
            "views",
            "forgot_password.hbs",
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: "[GoBarber] Recuperação de senha",
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}
