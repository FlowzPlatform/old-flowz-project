import SimpleSchema from 'simpl-schema';
export const ProductPriceSchemas = new SimpleSchema({
    sr_no: {
        type: Number,
        label: "sr no",
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
        label: "Qty1 Min"
    },
    qty_1_max: {
        type: Number,
        label: "Qty1 Max"
    },
    price_1: {
        type: Number,
        label: "Price1",
        max: 200
    },
    code_1: {
        type: String,
        label: "Code1"
    },

    qty_2_min: {
        type: Number,
        label: "Qty2 Min",
        optional: true
    },
    qty_2_max: {
        type: Number,
        label: "Qty2 Max",
        optional: true
    },
    price_2: {
        type: Number,
        label: "Price2",
        max: 200,
        optional: true
    },
    code_2: {
        type: String,
        label: "Code2",
        optional: true
    },

    qty_3_min: {
        type: Number,
        label: "Qty3 Min",
        optional: true
    },
    qty_3_max: {
        type: Number,
        label: "Qty3 Max",
        optional: true
    },
    price_3: {
        type: Number,
        label: "Price3",
        max: 200,
        optional: true
    },
    code_3: {
        type: String,
        label: "Code3",
        optional: true
    },

    qty_4_min: {
        type: Number,
        label: "Qty4 Min",
        optional: true
    },
    qty_4_max: {
        type: Number,
        label: "qty4 Max",
        optional: true
    },
    price_4: {
        type: Number,
        label: "Price4",
        max: 200,
        optional: true
    },
    code_4: {
        type: String,
        label: "Code4",
        optional: true
    },

    qty_5_min: {
        type: Number,
        label: "Qty5 Min",
        optional: true
    },
    qty_5_max: {
        type: Number,
        label: "Qty5 Max",
        optional: true
    },
    price_5: {
        type: Number,
        label: "Price5",
        max: 200,
        optional: true
    },
    code_5: {
        type: String,
        label: "Code5",
        optional: true
    },

    qty_6_min: {
        type: Number,
        label: "Qty6 Min",
        optional: true
    },
    qty_6_max: {
        type: Number,
        label: "Qty6 Max",
        optional: true
    },
    price_6: {
        type: Number,
        label: "Price6",
        max: 200,
        optional: true
    },
    code_6: {
        type: String,
        label: "Code6",
        optional: true
    },

    qty_7_min: {
        type: Number,
        label: "Qty7 Min",
        optional: true
    },
    qty_7_max: {
        type: Number,
        label: "Qty7 Max",
        optional: true
    },
    price_7: {
        type: Number,
        label: "Price7",
        max: 200,
        optional: true
    },
    code_7: {
        type: String,
        label: "Code7",
        optional: true
    },

    qty_8_min: {
        type: Number,
        label: "Qty8 Min",
        optional: true
    },
    qty_8_max: {
        type: Number,
        label: "Qty8 Max",
        optional: true
    },
    price_8: {
        type: Number,
        label: "Price8",
        max: 200,
        optional: true
    },
    code_8: {
        type: String,
        label: "Code8",
        optional: true
    },

    qty_9_min: {
        type: Number,
        label: "Qty9 Min",
        optional: true
    },
    qty_9_max: {
        type: Number,
        label: "Qty9 Max",
        optional: true
    },
    price_9: {
        type: Number,
        label: "Price9",
        max: 200,
        optional: true
    },
    code_9: {
        type: String,
        label: "Code9",
        optional: true
    },

    qty_10_min: {
        type: Number,
        label: "Qty10 Min",
        optional: true
    },
    qty_10_max: {
        type: Number,
        label: "Qty10 Max",
        optional: true
    },
    price_10: {
        type: Number,
        label: "Price10",
        max: 200,
        optional: true
    },
    code_10: {
        type: String,
        label: "Code10",
        optional: true
    },

    qty_11_min: {
        type: Number,
        label: "Qty11 Min",
        optional: true
    },
    qty_11_max: {
        type: Number,
        label: "Qty11 Max",
        optional: true
    },
    price_11: {
        type: Number,
        label: "Price11",
        max: 200,
        optional: true
    },
    code_11: {
        type: String,
        label: "Code11",
        optional: true
    },

    qty_12_min: {
        type: Number,
        label: "Qty12 Min",
        optional: true
    },
    qty_12_max: {
        type: Number,
        label: "Qty12 Max",
        optional: true
    },
    price_12: {
        type: Number,
        label: "Price12",
        max: 200,
        optional: true
    },
    code_12: {
        type: String,
        label: "Code12",
        optional: true
    },

    qty_13_min: {
        type: Number,
        label: "Qty13 Min",
        optional: true
    },
    qty_13_max: {
        type: Number,
        label: "Qty13 Max",
        optional: true
    },
    price_13: {
        type: Number,
        label: "Price13",
        max: 200,
        optional: true
    },
    code_13: {
        type: String,
        label: "Code13",
        optional: true
    },

    qty_14_min: {
        type: Number,
        label: "Qty14 Min",
        optional: true
    },
    qty_14_max: {
        type: Number,
        label: "Qty14 Max",
        optional: true
    },
    price_14: {
        type: Number,
        label: "Price14",
        max: 200,
        optional: true
    },
    code_14: {
        type: String,
        label: "Code14",
        optional: true
    },
    fileID: {
        type: String,
        label: "file ID"
    },
    owner: {
        type: String,
        label: "owner"
    },
    username: {
        type: String,
        label: "username"
    }
});