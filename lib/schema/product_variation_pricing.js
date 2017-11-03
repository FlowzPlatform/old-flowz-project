import SimpleSchema from 'simpl-schema';
export const ProductVariationPricingSchemas = new SimpleSchema({
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
    variation_label: {
        type: String,
        label: "Variation Label"
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
    attr_color: {
        type: String,
        label: "Attribute Color"
    },
    attr_size: {
        type: String,
        label: "Attribute Size"
    },
    attr_style: {
        type: String,
        label: "Attribute Style"
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
        label: "Qty2 Min"
    },
    qty_2_max: {
        type: Number,
        label: "Qty2 Max"
    },
    price_2: {
        type: Number,
        label: "Price2",
        max: 200
    },
    code_2: {
        type: String,
        label: "Code2"
    },

    qty_3_min: {
        type: Number,
        label: "Qty3 Min"
    },
    qty_3_max: {
        type: Number,
        label: "Qty3 Max"
    },
    price_3: {
        type: Number,
        label: "Price3",
        max: 200
    },
    code_3: {
        type: String,
        label: "Code3"
    },

    qty_4_min: {
        type: Number,
        label: "Qty4 Min"
    },
    qty_4_max: {
        type: Number,
        label: "qty4 Max"
    },
    price_4: {
        type: Number,
        label: "Price4",
        max: 200
    },
    code_4: {
        type: String,
        label: "Code4"
    },

    qty_5_min: {
        type: Number,
        label: "Qty5 Min"
    },
    qty_5_max: {
        type: Number,
        label: "Qty5 Max"
    },
    price_5: {
        type: Number,
        label: "Price5",
        max: 200
    },
    code_5: {
        type: String,
        label: "Code5"
    },

    qty_6_min: {
        type: Number,
        label: "Qty6 Min"
    },
    qty_6_max: {
        type: Number,
        label: "Qty6 Max"
    },
    price_6: {
        type: Number,
        label: "Price6",
        max: 200
    },
    code_6: {
        type: String,
        label: "Code6"
    },

    qty_7_min: {
        type: Number,
        label: "Qty7 Min"
    },
    qty_7_max: {
        type: Number,
        label: "Qty7 Max"
    },
    price_7: {
        type: Number,
        label: "Price7",
        max: 200
    },
    code_7: {
        type: String,
        label: "Code7"
    },

    qty_8_min: {
        type: Number,
        label: "Qty8 Min"
    },
    qty_8_max: {
        type: Number,
        label: "Qty8 Max"
    },
    price_8: {
        type: Number,
        label: "Price8",
        max: 200
    },
    code_8: {
        type: String,
        label: "Code8"
    },

    qty_9_min: {
        type: Number,
        label: "Qty9 Min"
    },
    qty_9_max: {
        type: Number,
        label: "Qty9 Max"
    },
    price_9: {
        type: Number,
        label: "Price9",
        max: 200
    },
    code_9: {
        type: String,
        label: "Code9"
    },

    qty_10_min: {
        type: Number,
        label: "Qty10 Min"
    },
    qty_10_max: {
        type: Number,
        label: "Qty10 Max"
    },
    price_10: {
        type: Number,
        label: "Price10",
        max: 200
    },
    code_10: {
        type: String,
        label: "Code10"
    },

    qty_11_min: {
        type: Number,
        label: "Qty11 Min"
    },
    qty_11_max: {
        type: Number,
        label: "Qty11 Max"
    },
    price_11: {
        type: Number,
        label: "Price11",
        max: 200
    },
    code_11: {
        type: String,
        label: "Code11"
    },

    qty_12_min: {
        type: Number,
        label: "Qty12 Min"
    },
    qty_12_max: {
        type: Number,
        label: "Qty12 Max"
    },
    price_12: {
        type: Number,
        label: "Price12",
        max: 200
    },
    code_12: {
        type: String,
        label: "Code12"
    },

    qty_13_min: {
        type: Number,
        label: "Qty13 Min"
    },
    qty_13_max: {
        type: Number,
        label: "Qty13 Max"
    },
    price_13: {
        type: Number,
        label: "Price13",
        max: 200
    },
    code_13: {
        type: String,
        label: "Code13"
    },

    qty_14_min: {
        type: Number,
        label: "Qty14 Min"
    },
    qty_14_max: {
        type: Number,
        label: "Qty14 Max"
    },
    price_14: {
        type: Number,
        label: "Price14",
        max: 200
    },
    code_14: {
        type: String,
        label: "Code14"
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