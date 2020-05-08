import IUsersRepository from "@modules/users/repositories/IUsersRepositories";
import { uuid } from "uuidv4";

import User from "@modules/users/infra/typeorm/entities/User";
import IcreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => id === user.id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => email === user.email);
    }

    public async create({
        name,
        email,
        password,
    }: IcreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid(), name, email, password });
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;
        return user;
    }
}

export default UsersRepository;
