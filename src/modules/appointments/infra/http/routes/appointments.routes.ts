import { Router } from "express";

import ensureAuthentication from "@modules/users/infra/http/middlewares/ensureAuthentication";
import AppointmentControler from "../controllers/AppointmentsController";

const appointementRoute = Router();

appointementRoute.use(ensureAuthentication);

const appointmentController = new AppointmentControler();

/* appointementRoute.get("/", async (request, response) => {
    const appointments = getCustomRepository(AppoimentsRepository);
    const appoimentsList = await appointments.find();
    return response.json(appoimentsList);
}); */

appointementRoute.post("/", appointmentController.create);

export default appointementRoute;
