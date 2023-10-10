import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import BaseEntity from './base';
import { Campaign } from './campaign.entity';

@Entity()
export class Voucher extends BaseEntity {
    @Index({ unique: true })
    @Column({
        name: 'discount_code',
        nullable: false,
    })
    discountCode!: string;

    @Column({ name: 'campaign_id' })
    campaignId!: string;

    @ManyToOne(() => Campaign, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'campaign_id' })
    campaign?: Campaign;
}
