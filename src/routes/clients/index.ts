import {Router} from "express";
import {
    createClientController,
    deleteClientController,
    listClientsController,
    updateClientController,
} from "../../controllers/clients";
import {ensureAuthenticationMiddleware} from "../../middlewares/ensureAuthenticationMiddleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import {clientSchema} from "../../schemas/clients";

const clientsRouter = Router();

clientsRouter.post(
    "",
    validationMiddleware(clientSchema),
    createClientController
);

clientsRouter.patch("", ensureAuthenticationMiddleware, updateClientController);

clientsRouter.get("", listClientsController);

clientsRouter.delete("", deleteClientController);
export default clientsRouter;
