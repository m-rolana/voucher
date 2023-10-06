import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from '@/db/entities/base';
import { Campaign } from '@/db/entities/campaign.entity';

@Entity()
export class Voucher extends BaseEntity {
    // TODO: add validator for prefix-XXXXXX
    @Column({
        name: 'discount_code',
        nullable: false,
    })
    discountCode!: string;

    @ManyToOne(() => Campaign)
    @JoinColumn({ name: 'campaign_id' })
    campaign?: Campaign;
}
