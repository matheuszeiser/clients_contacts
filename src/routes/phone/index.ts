import {Router} from "express";
import createPhoneController from "../../controllers/phones";
import {ensureAuthenticationMiddleware} from "../../middlewares/ensureAuthenticationMiddleware";

const phoneRouter = Router();

phoneRouter.post("", ensureAuthenticationMiddleware, createPhoneController);

export default phoneRouter;
