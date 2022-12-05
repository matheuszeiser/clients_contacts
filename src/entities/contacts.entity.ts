import e from "express";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Client} from "./clients.entity";
import {Email} from "./emails.entity";
import {Phone} from "./phones.entity";

@Entity()
export class Contacts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Client, {eager: true})
    client: Client;

    @OneToMany(() => Email, (email) => email.contacts)
    email: Email[];

    @OneToMany(() => Phone, (phone) => phone.contacts)
    phone: Phone[];
}
