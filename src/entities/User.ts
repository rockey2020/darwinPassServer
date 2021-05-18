import {
    Column,
    CreateDateColumn,
    Entity,
    Index, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import {Password} from "./Password";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 12})
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    maxIdleTime: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

    @OneToMany(() => Password, password => password.user)
    passwordList: Password[];
}
