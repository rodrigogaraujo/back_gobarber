import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";
import AppointmentControler from "../controllers/AppointmentsController";
import ProviderAppointmentsControler from "../controllers/ProviderAppointmentsController";

const appointementRoute = Router();

appointementRoute.use(ensureAuthentication);

const appointmentController = new AppointmentControler();
const providerAppointmentController = new ProviderAppointmentsControler();

/* appointementRoute.get("/", async (request, response) => {
    const appointments = getCustomRepository(AppoimentsRepository);
    const appoimentsList = await appointments.find();
    return response.json(appoimentsList);
}); */

appointementRoute.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentController.create,
);
appointementRoute.get("/me", providerAppointmentController.index);

export default appointementRoute;
