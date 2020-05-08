import { Router } from "express";
import appoimentsRoute from "@modules/appointments/infra/http/routes/appointments.routes";
import userRoute from "@modules/users/infra/http/routes/users.routes";
import sessionRoute from "@modules/users/infra/http/routes/sessions.routes";

const routes = Router();

routes.use("/appointments", appoimentsRoute);
routes.use("/users", userRoute);
routes.use("/sessions", sessionRoute);

export default routes;
