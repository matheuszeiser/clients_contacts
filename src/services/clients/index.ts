import {hash} from "bcrypt";
import AppDataSource from "../../data-source";
import {Client} from "../../entities/clients.entity";
import {AppError} from "../../errors/AppError";
import {IClientRequest} from "../../interfaces/clients";

export const createClientService = async ({
    username,
    name,
    password,
}: IClientRequest): Promise<Client> => {
    const clientRepository = AppDataSource.getRepository(Client);
    const alreadyExists = await clientRepository.findOneBy({username});

    if (alreadyExists) {
        throw new AppError("Client already exists", 400);
    }

    const hashedPassword = await hash(password, 10);

    const now = new Date();

    const client = clientRepository.create({
        username,
        name,
        password: hashedPassword,
    });

    await clientRepository.save(client);

    return client;
};

export const listClientsService = async (): Promise<Client[]> => {
    const clientRepository = AppDataSource.getRepository(Client);

    const clients = await clientRepository.find({
        relations: {
            phone: true,
            email: true,
        },
    });

    return clients;
};

export const updateClientService = async (
    id: string,
    clientData: IClientRequest
) => {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOneBy({
        id,
    });

    if (!client) {
        throw new AppError("Client not found", 404);
    }

    if (clientData.password) {
        clientData.password = await hash(clientData.password, 10);
    }

    const newUser = await clientRepository.save({...client, ...clientData});

    return newUser;
};

export const deleteClientService = async (id: string) => {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOneBy({
        id,
    });

    if (!client) {
        throw new AppError("client not Found");
    }

    await clientRepository.delete(client);
};
