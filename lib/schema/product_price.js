import SimpleSchema from 'simpl-schema';
export const ProductPriceSchemas = new SimpleSchema({
    sr_no: {
        type: Number,
        label: "sr_no",
        max: 1090,
        optional: true
    },
    product_id: {
        type: String,
        label: "Product Id"
    },
    sku: {
        type: String,
        label: "SKU",
        max: 200
    },
    price_type: {
        type: String,
        label: "Price Type",
        allowedValues: ['regular', 'piece_wise_price', 'call_for_price']
    },
    type: {
        type: String,
        label: "Type",
        allowedValues: ['decorative', 'blank', 'special', 'special_blank'],
        //msg : "Language type not allow this value"
    },
    global_price_type: {
        type: String,
        label: "Global Price Type",
        allowedValues: ['global', 'above_catalog', 'oversease']
    },
    price_unit: {
        type: String,
        label: "Price Unit",
        allowedValues: ['box', 'dozen', 'each', 'pack', 'pair', 'set']
    },

    qty_1_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_1_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_1: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_1: {
        type: String,
        label: "Code_1"
    },

    qty_2_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_2_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_2: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_2: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_3_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_3_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_3: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_3: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_4_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_4_max: {
        type: Number,
        label: "qty_4_min_Max",
        optional: true
    },
    price_4: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_4: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_5_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_5_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_5: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_5: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_6_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_6_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_6: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_6: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_7_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_7_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_7: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_7: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_8_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_8_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_8: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_8: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_9_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_9_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_9: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_9: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_10_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_10_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_10: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_10: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_11_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_11_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_11: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_11: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_12_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_12_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_12: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_12: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_13_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_13_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_13: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_13: {
        type: String,
        label: "Code_1",
        optional: true
    },

    qty_14_min: {
        type: Number,
        label: "Qty_1_Min",
        optional: true
    },
    qty_14_max: {
        type: Number,
        label: "Qty_1_Max",
        optional: true
    },
    price_14: {
        type: Number,
        label: "Price_1",
        max: 200,
        optional: true
    },
    code_14: {
        type: String,
        label: "Code_1",
        optional: true
    },
});
