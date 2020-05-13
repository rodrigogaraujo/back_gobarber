import { Router } from "express";
import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";

import ProfileController from "../controllers/ProfileController";

const profileRoute = Router();

const profileController = new ProfileController();

profileRoute.use(ensureAuthentication);
profileRoute.get("/", profileController.show);
profileRoute.put("/", profileController.update);

export default profileRoute;
