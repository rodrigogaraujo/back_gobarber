import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/erros/AppError";
import IUsersRepositorys from "@modules/users/repositories/IUsersRepositories";

interface IRequest {
    user_id: string;
}

@injectable()
export default class ListProviderService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const providers: User[] = await this.usersRepository.findProviders({
            expect_id: user_id,
        });

        if (!providers) {
            throw new AppError("Nenhum usuário cadastrado");
        }
        return providers;
    }
}
