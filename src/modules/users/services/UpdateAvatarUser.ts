import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/erros/AppError";
import IStorageProvider from "@shared/container/providers/StoredProvider/models/IStorageProvider";
import IUsersRepositorys from "../repositories/IUsersRepositories";

interface IRequest {
    user_id: string;
    filename: string;
}

@injectable()
export default class UpdateAvatarUser {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepositorys,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, filename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                "Usuário não autorizado, faça login e tente novamente",
                401,
            );
        }

        if (user.avatar) {
            this.storageProvider.deleteFile(user.avatar);
        }

        const filenameavatar = await this.storageProvider.saveFile(filename);

        user.avatar = filenameavatar;
        await this.usersRepository.save(user);

        return user;
    }
}
