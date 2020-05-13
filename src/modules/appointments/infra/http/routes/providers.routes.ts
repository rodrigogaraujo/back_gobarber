import { Router } from "express";

import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";
import ListProvidersController from "../controllers/ListProvidersController";

const listProvidersRoute = Router();

listProvidersRoute.use(ensureAuthentication);

const listProvidersController = new ListProvidersController();

/* appointementRoute.get("/", async (request, response) => {
    const appointments = getCustomRepository(AppoimentsRepository);
    const appoimentsList = await appointments.find();
    return response.json(appoimentsList);
}); */

listProvidersRoute.get("/", listProvidersController.index);

export default listProvidersRoute;
