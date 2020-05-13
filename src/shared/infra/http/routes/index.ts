import { Router } from "express";
import appoimentsRoute from "@modules/appointments/infra/http/routes/appointments.routes";
import listProvidersRoute from "@modules/appointments/infra/http/routes/providers.routes";
import userRoute from "@modules/users/infra/http/routes/users.routes";
import sessionRoute from "@modules/users/infra/http/routes/sessions.routes";
import passwordRoute from "@modules/users/infra/http/routes/password.routes";
import profileRoute from "@modules/users/infra/http/routes/profile.routes";

const routes = Router();

routes.use("/appointments", appoimentsRoute);
routes.use("/providers", listProvidersRoute);
routes.use("/users", userRoute);
routes.use("/sessions", sessionRoute);
routes.use("/password", passwordRoute);
routes.use("/profile", profileRoute);

export default routes;
