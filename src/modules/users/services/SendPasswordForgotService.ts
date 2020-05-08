import { injectable, inject } from "tsyringe";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/erros/AppError";
import IUsersRepositorys from "../repositories/IUsersRepositories";

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
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (!checkUserExists) {
            throw new AppError("Email não cadastrado em nossa base de dados");
        }
        this.mailProvider.sendMail(email, "Recover your pass");
    }
}
