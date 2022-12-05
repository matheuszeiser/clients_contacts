import {Certificate} from "crypto";
import AppDataSource from "../../data-source";
import {Client} from "../../entities/clients.entity";
import {Phone} from "../../entities/phones.entity";
import {AppError} from "../../errors/AppError";
import {IPhoneRequest} from "../../interfaces/phone";

const createPhoneService = async (id: string, {number}: IPhoneRequest) => {
    const phoneRepository = AppDataSource.getRepository(Phone);
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOneBy({id});

    const phoneAlreadyExists = await phoneRepository.findOneBy({number});

    if (phoneAlreadyExists) {
        throw new AppError("Phone already exists");
    }

    const phone = await phoneRepository.save({
        number,
        client: client!,
    });

    return phone;
};

export default createPhoneService;
