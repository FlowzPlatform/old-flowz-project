import SimpleSchema from 'simpl-schema';

export const ProductImagesSchemas = new SimpleSchema({
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
    Color_1: {
        type: String,
        label: "Color_1"
    },
    Web_Image_1: {
        type: String,
        label: "Web Image 1"
    },
    Color_2: {
        type: String,
        label: "Color_2",
        optional: true
    },
    Web_Image_2: {
        type: String,
        label: "Web Image 2",
        optional: true
    },
    Color_3: {
        type: String,
        label: "Color 3",
        optional: true
    },
    Web_Image_3: {
        type: String,
        label: "Web Image 3",
        optional: true
    },
    Color_4: {
        type: String,
        label: "Color 4",
        optional: true
    },
    Web_Image_4: {
        type: String,
        label: "Web Image 4",
        optional: true
    },
    Color_5: {
        type: String,
        label: "Color 5",
        optional: true
    },
    Web_Image_5: {
        type: String,
        label: "Web Image 5",
        optional: true
    },
    Color_6: {
        type: String,
        label: "Color 6",
        optional: true
    },
    Web_Image_6: {
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