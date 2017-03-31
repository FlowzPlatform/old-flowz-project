import SimpleSchema from 'simpl-schema';
export const ProductImprintDataSchemas = new SimpleSchema({
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
    imprint_position: {
        type: String,
        label: "Imprint Position"
    },
    imprint_area: {
        type: String,
        label: "Imprint Area",
    },
    matrix: {
        type: String,
        label: "Matrix"
    },
    max_imprint_color_allowed: {
        type: Number,
        label: "Max Imprint Color allowed"
    },
    price_included: {
        type: Number,
        label: "Price Included"
    },
    max_location_allowed: {
        type: Number,
        label: "Max Location allowed"
    },
    location_price_included: {
        type: Number,
        label: "Location Price Included",
        max: 200
    },
    full_color: {
        type: String,
        label: "Full Color"
    },
    production_days: {
        type: String,
        label: "Production Days"
    },
    production_unit: {
        type: Number,
        label: "Production unit"
    },
    setup_charge: {
        type: Number,
        label: "Setup Charge",
        max: 200
    },
    additional_location_charge: {
        type: Number,
        label: "Additional Location Charge"
    },

    additional_color_charge: {
        type: Number,
        label: "Additional Color Charge"
    },
    rush_charge: {
        type: Number,
        label: "Rush Charge"
    },
    ltm_charge: {
        type: Number,
        label: "LTM Charge",
        max: 200
    },
    pms_charge: {
        type: Number,
        label: "PMS Charge"
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
        type: Number,
        label: "Code_1"
    },

    qty_2_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_2_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_2: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_2: {
        type: Number,
        label: "Code_1"
    },

    qty_3_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_3_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_3: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_3: {
        type: Number,
        label: "Code_1"
    },

    qty_4_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_4_max: {
        type: Number,
        label: "qty_4_min_Max"
    },
    price_4: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_4: {
        type: Number,
        label: "Code_1"
    },

    qty_5_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_5_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_5: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_5: {
        type: Number,
        label: "Code_1"
    },

    qty_6_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_6_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_6: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_6: {
        type: Number,
        label: "Code_1"
    },

    qty_7_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_7_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_7: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_7: {
        type: Number,
        label: "Code_1"
    },

    qty_8_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_8_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_8: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_8: {
        type: Number,
        label: "Code_1"
    },

    qty_9_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_9_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_9: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_9: {
        type: Number,
        label: "Code_1"
    },

    qty_10_min: {
        type: Number,
        label: "Qty_1_Min"
    },
    qty_10_max: {
        type: Number,
        label: "Qty_1_Max"
    },
    price_10: {
        type: Number,
        label: "Price_1",
        max: 200
    },
    code_10: {
        type: Number,
        label: "Code_1"
    },
});