import { uuid } from "uuidv4";

import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import IUserTokenRepository from "../IUserTokenRepository";

class FakeUserTokenRepository implements IUserTokenRepository {
    private users: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.users.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        return this.users.find(userToken => userToken.token === token);
    }
}

export default FakeUserTokenRepository;
