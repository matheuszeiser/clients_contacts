import {instanceToPlain} from "class-transformer";
import {Request, Response} from "express";
import {AppError} from "../../errors/AppError";
import {handleError} from "../../middlewares/errors.mid";
import {
    createClientService,
    deleteClientService,
    listClientsService,
    updateClientService,
} from "../../services/clients";

export const createClientController = async (req: Request, res: Response) => {
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

export const listClientsController = async (req: Request, res: Response) => {
    try {
        const client = await listClientsService();
        return res.json(instanceToPlain(client));
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};

export const updateClientController = async (req: Request, res: Response) => {
    try {
        const clientData = req.body;
        const {id} = req.client;

        const updatedClient = await updateClientService(id, clientData);

        return res.json(instanceToPlain(updatedClient));
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};

export const deleteClientController = async (req: Request, res: Response) => {
    try {
        const {id} = req.client;

        await deleteClientService(id);

        return res.status(204).json({message: "User deleted with successful"});
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res);
        }
    }
};
