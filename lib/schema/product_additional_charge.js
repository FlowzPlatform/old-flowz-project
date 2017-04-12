import SimpleSchema from 'simpl-schema';
export const ProductAdditionalChargeSchemas = new SimpleSchema({
    sr_no: {
        type: Number,
        label: "sr no",
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
        type: Number,
        label: "Code1"
    },
    Net_Price_1: {
        type: Number,
        label: "Net Price 1"
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
    Net_Price_2: {
        type: Number,
        label: "Net Price 2",
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
    Net_Price_3: {
        type: Number,
        label: "Net Price 3",
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
    Net_Price_4: {
        type: Number,
        label: "Net Price 4",
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
    Net_Price_5: {
        type: Number,
        label: "Net Price 5",
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