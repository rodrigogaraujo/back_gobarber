import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";

import ProfileController from "../controllers/ProfileController";

const profileRoute = Router();

const profileController = new ProfileController();

profileRoute.use(ensureAuthentication);
profileRoute.get("/", profileController.show);
profileRoute.put(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref("password")),
        },
    }),
    profileController.update,
);

export default profileRoute;
