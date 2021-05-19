import {
    Column,
    CreateDateColumn,
    Entity,
    Index, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import {User} from "./User";

@Entity()
export class Password {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    notes: string;

    @Column()
    title: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

    @ManyToOne(() => User, user => user.passwordList)
    user: User;
}
