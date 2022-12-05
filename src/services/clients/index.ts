import {hash} from "bcrypt";
import AppDataSource from "../../data-source";
import {Client} from "../../entities/clients.entity";
import {AppError} from "../../errors/AppError";
import {IClientRequest} from "../../interfaces/clients";

const createClientService = async ({
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

export default createClientService