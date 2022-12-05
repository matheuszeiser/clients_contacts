import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Client} from "./clients.entity";
import {Contacts} from "./contacts.entity";

@Entity()
export class Phone {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    number: string;

    @ManyToOne(() => Client)
    client?: Client;

    @ManyToOne(() => Contacts)
    contacts?: Contacts;
}
