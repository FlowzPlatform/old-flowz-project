import SimpleSchema from 'simpl-schema';
export const ProductShippingSchemas = new SimpleSchema({
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
    fob_city: {
        type: String,
        label: "Free On Board City"
    },
    fob_state_code: {
        type: String,
        label: "Free On Board State Code"
    },
    fob_country_code: {
        type: String,
        label: "Free On Board Country Code"
    },
    fob_zip_code: {
        type: String,
        label: "Free On Board zipcode"
    },
    shipping_qty_per_carton: {
        type: Number,
        label: "Shipping Qty Per Carton"
    },
    carton_length: {
        type: Number,
        label: "Carton Length"
    },
    carton_width: {
        type: Number,
        label: "Carton Width"
    },
    carton_height: {
        type: Number,
        label: "Carton Height"
    },
    carton_weight: {
        type: Number,
        label: "Carton Weight"
    },
    product_length: {
        type: Number,
        label: "Product Length"
    },
    product_width: {
        type: Number,
        label: "Product Width",
        max: 200
    },
    product_height: {
        type: Number,
        label: "Product Height"
    },
    product_weight: {
        type: Number,
        label: "Product Weight"
    },
    carton_size_unit: {
        type: Number,
        label: "carton_size_unit"
    },
    carton_weight_unit: {
        type: Number,
        label: "carton_weight_unit",
        max: 200
    },
    product_size_unit: {
        type: Number,
        label: "product_size_unit"
    },
    product_weight_unit: {
        type: Number,
        label: "product_weight_unit"
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