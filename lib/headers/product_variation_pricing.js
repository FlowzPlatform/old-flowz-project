export const ProductVariationPricingHeaders = [{
        column: 'sku',
        type: 'text'
    },
    {
        column: 'variation_label',
        type: 'text'
    },

    // Attribute can be multiple line attr_color,attr_size
    {
        column: 'attr_color',
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
        column: 'qty_2_min',
        type: 'numeric'
    },
    {
        column: 'qty_2_max',
        type: 'numeric'
    },
    {
        column: 'price_2',
        type: 'double'
    },
    {
        column: 'code_2',
        type: 'text'
    },

    {
        column: 'qty_3_min',
        type: 'numeric'
    },
    {
        column: 'qty_3_max',
        type: 'numeric'
    },
    {
        column: 'price_3',
        type: 'double'
    },
    {
        column: 'code_3',
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