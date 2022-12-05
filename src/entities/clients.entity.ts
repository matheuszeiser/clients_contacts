import {
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    Entity,
} from "typeorm";
import {Exclude} from "class-transformer";
import {Contacts} from "./contacts.entity";
import {Email} from "./emails.entity";
import {Phone} from "./phones.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @CreateDateColumn({type: "date"})
    date_joined: Date;

    @OneToMany(() => Contacts, (contacts) => contacts.client)
    contacts: Contacts[];

    @OneToMany(() => Email, (email) => email.client)
    email: Email[];

    @OneToMany(() => Phone, (phone) => phone.client)
    phone: Phone[];
}
