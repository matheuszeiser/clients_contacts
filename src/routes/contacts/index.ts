import {Router} from "express";
import {createContactController} from "../../controllers/contacts";
import createPhoneController from "../../controllers/phones";
import {ensureAuthenticationMiddleware} from "../../middlewares/ensureAuthenticationMiddleware";

const contactRouter = Router();

contactRouter.post("", ensureAuthenticationMiddleware, createContactController);

export default contactRouter;
