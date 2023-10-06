import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from '@/db/entities/base';
import { Campaign } from '@/db/entities/campaign.entity';

@Entity()
export class Voucher extends BaseEntity {
    @Column({
        name: 'discount_code',
        nullable: false,
    })
    discountCode!: string;

    @Column({ name: 'campaign_id' })
    campaignId!: string;

    @ManyToOne(() => Campaign)
    @JoinColumn()
    campaign?: Campaign;
}
