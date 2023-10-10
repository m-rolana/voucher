const campaign = `INSERT INTO public.campaign
(id, created_at, updated_at, deleted_at, starts_at, ends_at, amount, currency, prefix)
VALUES(
    '00000000-0000-0000-0000-000000000004'::uuid,
    '2023-10-07 09:33:43.562',
    '2023-10-07 09:33:43.562',
    NULL,
    '2023-10-07 09:32:12.622',
    NULL,
    0,
    'USD'::public."campaign_currency_enum",
    'RECHARGE'::public."campaign_prefix_enum"
);`;

const vouchers = [
    `INSERT INTO public.voucher
    (id, created_at, updated_at, deleted_at, discount_code, campaign_id)
    VALUES(
        '00000000-0000-0000-0000-000000000001'::uuid,
        '2023-10-07 09:33:43.562',
        '2023-10-07 09:33:43.562',
        NULL,
        'RECHARGE-XXXXXX',
        '00000000-0000-0000-0000-000000000004'::uuid
    );`,
    `INSERT INTO public.voucher
    (id, created_at, updated_at, deleted_at, discount_code, campaign_id)
    VALUES(
        '00000000-0000-0000-0000-000000000002'::uuid,
        '2023-10-07 09:33:43.562',
        '2023-10-07 09:33:43.562',
        NULL,
        'RECHARGE-XXXXXA',
        '00000000-0000-0000-0000-000000000004'::uuid
    );`,
];

export = [campaign, ...vouchers];
