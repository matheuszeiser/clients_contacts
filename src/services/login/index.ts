import {compare} from "bcrypt";
import AppDataSource from "../../data-source";
import {Client} from "../../entities/clients.entity";
import {AppError} from "../../errors/AppError";
import {ILogin} from "../../interfaces/login";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async ({
    username,
    password,
}: ILogin): Promise<string> => {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOneBy({username});

    if (!client) {
        throw new AppError("Invalid username or password", 400);
    }

    const matchPassword = await compare(password, client.password);

    if (!matchPassword) {
        throw new AppError("Invalid username or password", 400);
    }

    const token = jwt.sign(
        {
            clientId: client.id,
        },
        process.env.SECRET_KEY as string,
        {
            subject: client.id,
            expiresIn: "2h",
        }
    );

    return token;
};

export default createLoginService;
