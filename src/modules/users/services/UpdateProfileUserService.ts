import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/erros/AppError";
import IHashProvider from "../providers/HashProvider/modules/IHashProvider";
import IUsersRepositorys from "../repositories/IUsersRepositories";

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
export default class UpdateProfileUser {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,

        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User | undefined> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const userWithUpdateEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Email já cadastrado.");
        }
        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError("Informe a senha anterior");
        }

        if (password && old_password) {
            const checkOldpassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldpassword) {
                throw new AppError("Informe a senha anterior corretamente.");
            }
        }

        if (password) {
            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}
