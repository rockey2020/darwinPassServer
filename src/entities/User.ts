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

    @Column({type: "varchar", length: 100})
    username: string;

    @Column({type: "varchar", length: 100, unique: true})
    email: string;

    @Column({type: "varchar",length:100})
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
