import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Client} from "./clients.entity";
import {Contacts} from "./contacts.entity";

@Entity()
export class Email {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @ManyToOne(() => Client)
    client?: Client;

    @ManyToOne(() => Contacts)
    contacts?: Contacts;
}
