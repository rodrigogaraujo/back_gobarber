import { Repository, getRepository, Not } from "typeorm";

import IUsersRepository from "@modules/users/repositories/IUsersRepositories";

import User from "@modules/users/infra/typeorm/entities/User";
import IcreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IListProvidersDTO from "@modules/users/dtos/IListProvidersDTO";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findProviders({
        expect_id,
    }: IListProvidersDTO): Promise<User[]> {
        let users: User[] = [];
        if (expect_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(expect_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }
        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });
        return user;
    }

    public async create({
        name,
        email,
        password,
    }: IcreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });
        await this.ormRepository.save(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
