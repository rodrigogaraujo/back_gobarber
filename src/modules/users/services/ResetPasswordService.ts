import { injectable, inject } from "tsyringe";
import { isAfter, addHours } from "date-fns";

import AppError from "@shared/erros/AppError";
import IUsersRepositorys from "../repositories/IUsersRepositories";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from "../providers/HashProvider/modules/IHashProvider";

interface IRequest {
    password: string;
    token: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,
        @inject("UserToken")
        private userTokenRepository: IUserTokenRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);
        if (!userToken) {
            throw new AppError(
                "Token de atualização de senha não existe ou expirou",
            );
        }
        const user = await this.usersRepository.findById(userToken.user_id.id);
        if (!user) {
            throw new AppError(
                "O usuário não foi encontrado em nossa base de dados",
            );
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError(
                "Token de atualiazação de senha expirado, tente novamente com outro token",
            );
        }

        user.password = await this.hashProvider.generateHash(password);
        await this.usersRepository.save(user);
    }
}
