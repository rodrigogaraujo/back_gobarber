import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import Users from "@modules/users/infra/typeorm/entities/User";

@Entity("appointments")
class Appoiment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: "provider_id" })
    provider: Users;

    @Column("timestamp")
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appoiment;
