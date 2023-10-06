import { Entity, Column } from 'typeorm';
import BaseEntity from '@/db/entities/base';

enum CURRENCY { USD = 'USD', EUR = 'EUR' }
enum PREFIX {
    RECHARGE = 'RECHARGE',
    GIFT_CARD = 'GIFT_CARD',
    FREE_SHIPPING = 'FREE_SHIPPING',
    DISCOUNT = 'DISCOUNT',
}

@Entity()
export class Campaign extends BaseEntity {
    @Column({
        name: 'starts_at',
        nullable: false,
        default: new Date(),
    })
    startsAt!: Date;

    @Column({
        name: 'ends_at',
        nullable: true,
    })
    endsAt!: Date;

    @Column({
        nullable: false,
        default: 0,
    })
    amount!: number;

    @Column({
        type: "enum",
        enum: CURRENCY,
        nullable: false,
        default: CURRENCY.USD,
    })
    currency!: CURRENCY;

    @Column({
        type: "enum",
        enum: PREFIX,
        nullable: false,
    })
    prefix!: PREFIX;
}
