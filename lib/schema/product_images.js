import SimpleSchema from 'simpl-schema';

export const ProductImagesSchemas = new SimpleSchema({
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
    color_1: {
        type: String,
        label: "Color 1"
    },
    web_image_1: {
        type: String,
        label: "Web Image 1"
    },
    color_2: {
        type: String,
        label: "Color 2",
        optional: true
    },
    web_image_2: {
        type: String,
        label: "Web Image 2",
        optional: true
    },
    color_3: {
        type: String,
        label: "Color 3",
        optional: true
    },
    Web_image_3: {
        type: String,
        label: "Web Image 3",
        optional: true
    },
    color_4: {
        type: String,
        label: "Color 4",
        optional: true
    },
    web_image_4: {
        type: String,
        label: "Web Image 4",
        optional: true
    },
    color_5: {
        type: String,
        label: "Color 5",
        optional: true
    },
    web_image_5: {
        type: String,
        label: "Web Image 5",
        optional: true
    },
    color_6: {
        type: String,
        label: "Color 6",
        optional: true
    },
    web_image_6: {
        type: String,
        label: "Web Image 6",
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