import {Request, Response} from "express";
import {AppError} from "../../errors/AppError";
import {IPhoneRequest} from "../../interfaces/phone";
import {handleError} from "../../middlewares/errors.mid";
import createPhoneService from "../../services/phone";

const createPhoneController = async (req: Request, res: Response) => {
    try {
        const {number}: IPhoneRequest = req.body;
        const {id} = req.client;

        const phone = await createPhoneService(id, {number});
        return res.status(201).json(phone);
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};

export default createPhoneController;
