import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
    Column,
} from "typeorm";

@Entity("user_token")
class UserToken {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Generated("uuid")
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserToken;
