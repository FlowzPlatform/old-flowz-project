export const ProductPrice = [{
        column: 'SKU',
        type: 'text'
    },
    {
        column: 'Price_Type',
        type: 'text'
    },
    {
        // decorative / blank / special / special_blank || string check || single entry || not case sensetive
        column: 'type',
        type: 'text'
    },
    {
        column: 'global_price_type',
        type: 'text'
    },
    {
        column: 'global_price_type',
        type: 'text'
    },

    // max 20 numeric of price range
    {
        column: 'Qty_1_Min',
        type: 'numeric'
    },
    {
        column: 'Qty_1_Max',
        type: 'numeric'
    },
    {
        column: 'Price_1',
        type: 'double'
    },
    {
        column: 'Code_1',
        type: 'text'
    }

];

/*
SKU
*ATTR_Colors
*ATTR_Size
*ATTR_GENDER
feature_1, feature_2.....feature_n
*/