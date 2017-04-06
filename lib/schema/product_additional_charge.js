import SimpleSchema from 'simpl-schema';
export const ProductAdditionalChargeSchemas = new SimpleSchema({
    sr_no: {
        type: Number,
        label: "sr_no",
        max: 1090,
        optional: true
    },
    product_id: {
        type: String,
        label: "Product Id",
        optional: true
    },
    sku: {
        type: String,
        label: "SKU",
        max: 200
    },
    charge_name: {
        type: String,
        label: "Charge Name",
    },
    option_name: {
        type: String,
        label: "Option Name"
    },
    moq: {
        type: String,
        label: "MOQ",
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
    Net_Price_1: {
        type: Number,
        label: "Net Price 1"
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
    Net_Price_2: {
        type: Number,
        label: "Net Price 2",
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
    Net_Price_3: {
        type: Number,
        label: "Net Price 3",
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
    Net_Price_4: {
        type: Number,
        label: "Net Price 4",
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
    Net_Price_5: {
        type: Number,
        label: "Net Price 5",
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
    Net_Price_6: {
        type: Number,
        label: "Net Price 6",
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