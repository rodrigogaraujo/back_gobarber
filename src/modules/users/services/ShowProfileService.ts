import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/erros/AppError";
import IUsersRepositorys from "../repositories/IUsersRepositories";

interface IRequest {
    user_id: string;
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User | undefined> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }
        return this.usersRepository.save(user);
    }
}
