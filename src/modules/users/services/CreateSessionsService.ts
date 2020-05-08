import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/erros/AppError";
import authConfig from "@config/auth";
import IHashProvider from "@modules/users/providers/HashProvider/modules/IHashProvider";
import IUsersRepositorys from "../repositories/IUsersRepositories";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class CreateSessionsService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,

        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const verifyUserEmail = await this.usersRepository.findByEmail(email);
        if (!verifyUserEmail) {
            throw new AppError("Email ou senha estão incorretos :/", 401);
        }
        const verifyPasswd = await this.hashProvider.compareHash(
            password,
            verifyUserEmail.password,
        );
        if (!verifyPasswd) {
            throw new AppError("Email ou senha estão incorretos :/", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: verifyUserEmail.id,
            expiresIn,
        });
        return { user: verifyUserEmail, token };
    }
}

export default CreateSessionsService;
