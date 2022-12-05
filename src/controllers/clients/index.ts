import {instanceToPlain} from "class-transformer";
import {Request, Response} from "express";
import {AppError} from "../../errors/AppError";
import {handleError} from "../../middlewares/errors.mid";
import createClientService from "../../services/clients";

const createClientController = async (req: Request, res: Response) => {
    try {
        const client = req.body;
        const newClient = await createClientService(client);
        return res.status(201).json(instanceToPlain(newClient));
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};

export default createClientController;
