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

    @Column({default: 7 * 24 * 60 * 60})
    maxIdleTime: number;//单位: 秒  最大空闲七天  每七天输一次密码

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

    @OneToMany(() => Password, password => password.user)
    passwordList: Password[];
}
