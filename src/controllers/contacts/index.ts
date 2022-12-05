import {Request, Response} from "express";
import AppDataSource from "../../data-source";
import {AppError} from "../../errors/AppError";
import {handleError} from "../../middlewares/errors.mid";
import {createContactService} from "../../services/contacts";

export const createContactController = async (req: Request, res: Response) => {
    try {
        const {id} = req.client;
        const {name} = req.body;

        const contact = await createContactService(id, {name});

        return res.status(201).json({contact, message: "Contact added with success"});
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};
