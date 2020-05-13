import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateAvatarUser from "@modules/users/services/UpdateAvatarUserService";

export default class UserAvatarController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateAvatarUser = container.resolve(UpdateAvatarUser);
        const user = await updateAvatarUser.execute({
            user_id: request.user.id,
            filename: request.file.filename,
        });
        delete user.password;
        return response.status(200).json(user);
    }
}
