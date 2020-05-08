import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const userRoute = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoute.post("/", usersController.create);

userRoute.patch(
    "/avatar",
    ensureAuthentication,
    upload.single("avatar"),
    userAvatarController.create,
);

export default userRoute;
