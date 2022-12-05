import AppDataSource from "../../data-source";
import {Client} from "../../entities/clients.entity";
import {Contacts} from "../../entities/contacts.entity";
import {AppError} from "../../errors/AppError";
import {IContactRequest} from "../../interfaces/contact";

export const createContactService = async (
    id: string,
    {name}: IContactRequest
) => {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const clientRepository = AppDataSource.getRepository(Client);

    const client = clientRepository.findOneBy({id});

    const contactAlreadyExists = await contactRepository.findOneBy({name});

    if (contactAlreadyExists) {
        throw new AppError("Contact already exists");
    }

    const contact = contactRepository.create({
        name,
        client: client!,
    });

    return contact;
};
