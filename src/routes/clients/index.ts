import {Router} from "express";
import createClientController from "../../controllers/clients";
import validationMiddleware from "../../middlewares/validation.middleware";
import {clientSchema} from "../../schemas/clients";

const clientsRouter = Router();

clientsRouter.post(
    "",
    validationMiddleware(clientSchema),
    createClientController
);

export default clientsRouter;
