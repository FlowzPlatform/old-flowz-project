export const ProductAdditionalChargesHeaders = [{
        column: 'sku',
        type: 'text',
        text: 'sku',
    },
    {
        column: 'charge_name',
        type: 'text',
        text: 'charge name',
    },
    {
        // decorative / blank / special / special_blank || string check || single entry || not case sensetive
        column: 'option_name',
        type: 'text',
        text: 'option name',
    },
    {
        column: 'moq',
        type: 'text',
        text: 'moq',
    },
    {
        column: 'price_unit',
        type: 'text',
        text: 'price unit',
    },

    // max 20 numeric of price range
    {
        column: 'qty_1_min',
        type: 'numeric',
        text: 'qty1 min',
    },
    {
        column: 'qty_1_max',
        type: 'numeric',
        text: 'qty1 max',

    },
    {
        column: 'price_1',
        type: 'double',
        text: 'price1',
    },
    {
        column: 'code_1',
        type: 'text',
        text: 'code1',
    },
    {
        column: 'net_price_1',
        type: 'double',
        text: 'net price1',
    },
];

/*
SKU
*ATTR_Colors
*ATTR_Size
*ATTR_GENDER
feature_1, feature_2.....feature_n
*/
