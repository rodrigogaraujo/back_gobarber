import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/erros/AppError";
import IHashProvider from "@modules/users/providers/HashProvider/modules/IHashProvider";
import IUsersRepositorys from "../repositories/IUsersRepositories";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,
        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const findByEmail = await this.usersRepository.findByEmail(email);
        if (findByEmail) {
            throw new AppError("Este email já está cadastrado");
        }
        const passwd = await this.hashProvider.generateHash(password);
        const user = await this.usersRepository.create({
            name,
            email,
            password: passwd,
        });
        return user;
    }
}
