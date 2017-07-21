import SimpleSchema from 'simpl-schema'
export const ProductInformationSchema = new SimpleSchema({
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
        optional: false
    },
    country: {
        type: String,
        label: "Country",
        allowedValues: ['US', 'CA', 'AU'],
        optional: false
    },
    language: {
        type: String,
        label: "Language",
        allowedValues: ['en', 'fr'],
        optional: false
    },
    currency: {
        type: String,
        label: "Currency",
        allowedValues: ['USD', 'CAD'],
        optional: false
    },
    product_name: {
        type: String,
        label: "Product Name",
        optional: false
    },
    description: {
        type: String,
        label: "Description",
        optional: false
    },
    linename: {
        type: String,
        label: "Linename"
    },
    categories: {
        type: String,
        label: "Categories",
        optional: false
    },
    search_keyword: {
        type: String,
        label: "Search Keyword",
        optional: false
    },
    default_image: {
        type: String,
        label: "Default Image",
        optional: false
    },
    default_image_color_code: {
        type: String,
        label: "Default Image Color Code",
        optional: true
    },
    valid_up_to: {
        type: Date,
        label: "Valid Up To",
        optional: true
    },
    matrix_price: {
        type: String,
        label: "Matrix Price",
        optional: true
    },
    matrix_frieght: {
        type: String,
        label: "Matrix Frieght",
        optional: true
    },
    vat: {
        type: String,
        label: "Vat",
        optional: true
    },
    vat_unit: {
        type: String,
        label: "vat unit",
        optional: true
    },
    packaging_type: {
        type: String,
        label: "Packaging Type",
        optional: true
    },
    packaging_charges: {
        type: String,
        label: "Packaging Charges",
        optional: true
    },
    packaging_code: {
        type: String,
        label: "Packaging Code",
        optional: true
    },
    video_url: {
        type: String,
        label: "Video URL",
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    distributor_central_url: {
        type: String,
        label: "Distributor Central URL",
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    special_price_valid_up_to: {
        type: Date,
        label: "Special Price Valid Up To",
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
    },
  feature_1: {
        type: String,
        label: "feature_1"
    },
  feature_2: {
          type: String,
          label: "feature_2"
      },
});
