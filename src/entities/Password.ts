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

    @Column({type: "varchar", length: 3000, nullable: true})
    url: string;

    @Column({type: "varchar", length: 10000, nullable: true})
    notes: string;

    @Column({type: "varchar", length: 100, nullable: true})
    title: string;

    @Column({type: "varchar", length: 100, nullable: true})
    username: string;

    @Column({type: "varchar", length: 100, nullable: true})
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
