import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";
import ListProvidersController from "../controllers/ListProvidersController";
import ProviderMonthAviabilityController from "../controllers/ProviderMonthAviabilityController";
import ProviderDayAviabilityController from "../controllers/ProviderDayAviabilityController";

const listProvidersRoute = Router();

listProvidersRoute.use(ensureAuthentication);

const listProvidersController = new ListProvidersController();
const listMonthAviabilityController = new ProviderMonthAviabilityController();
const listDayAviabilityController = new ProviderDayAviabilityController();

/* appointementRoute.get("/", async (request, response) => {
    const appointments = getCustomRepository(AppoimentsRepository);
    const appoimentsList = await appointments.find();
    return response.json(appoimentsList);
}); */

listProvidersRoute.get("/", listProvidersController.index);
listProvidersRoute.get(
    "/:provider-id/month-aviability",
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    listMonthAviabilityController.index,
);
listProvidersRoute.get(
    "/:provider-id/day-aviability",
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    listDayAviabilityController.index,
);
export default listProvidersRoute;
