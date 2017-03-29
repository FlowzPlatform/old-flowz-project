export const ProductAdditionalChargeHeaders = [{
        column: 'sku',
        type: 'text'
    },
    {
        column: 'charge_name',
        type: 'text'
    },
    {
        // decorative / blank / special / special_blank || string check || single entry || not case sensetive
        column: 'option_name',
        type: 'text'
    },
    {
        column: 'moq',
        type: 'text'
    },
    {
        column: 'price_unit',
        type: 'text'
    },

    // max 20 numeric of price range
    {
        column: 'qty_1_min',
        type: 'numeric'
    },
    {
        column: 'qty_1_max',
        type: 'numeric'
    },
    {
        column: 'price_1',
        type: 'double'
    },
    {
        column: 'code_1',
        type: 'text'
    },
    {
        column: 'net_price_1',
        type: 'double'
    },
];

/*
SKU
*ATTR_Colors
*ATTR_Size
*ATTR_GENDER
feature_1, feature_2.....feature_n
*/