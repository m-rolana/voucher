import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';


@Entity()
class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id!: string;

    @CreateDateColumn({ name: 'created_at' })
        createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
        updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
        deletedAt!: Date | null;
}

export default BaseEntity;