export const ProductVariationPricingHeaders = [{
        column: 'sku',
        type: 'text',
        text: 'sku',
    },
    {
        column: 'variation_label',
        type: 'text',
        text: 'variation label',
    },

    // Attribute can be multiple line attr_color,attr_size
    {
        column: 'attr_color',
        type: 'text',
        text: 'attr color',
    },
    {
        // decorative / blank / special / special_blank || string check || single entry || not case sensetive
        column: 'type',
        type: 'text',
        text: 'type',
    },
    {
        column: 'global_price_type',
        type: 'text',
        text: 'global price type',
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
        column: 'qty_2_min',
        type: 'numeric',
        text: 'qty2 min',
    },
    {
        column: 'qty_2_max',
        type: 'numeric',
        text: 'qty2 max',
    },
    {
        column: 'price_2',
        type: 'double',
        text: 'price2',
    },
    {
        column: 'code_2',
        type: 'text',
        text: 'code2',
    },

    {
        column: 'qty_3_min',
        type: 'numeric',
        text: 'qty3 min',
    },
    {
        column: 'qty_3_max',
        type: 'numeric',
        text: 'qty3 max',
    },
    {
        column: 'price_3',
        type: 'double',
        text: 'price3',
    },
    {
        column: 'code_3',
        type: 'text',
        text: 'code3',
    }

];

/*
SKU
*ATTR_Colors
*ATTR_Size
*ATTR_GENDER
feature_1, feature_2.....feature_n
*/