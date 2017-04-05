import { Mongo } from 'meteor/mongo';

// import schema
import { ProductInformationSchema } from '../../lib/schema/product_information.js';
import { ProductAdditionalChargeSchemas } from '../../lib/schema/product_additional_charge.js';
import { ProductImagesSchemas } from '../../lib/schema/product_images.js';
import { ProductImprintDataSchemas } from '../../lib/schema/product_imprint_data.js';
import { ProductPriceSchemas } from '../../lib/schema/product_price.js';
import { ProductShippingSchemas } from '../../lib/schema/product_shipping.js';
import { ProductVariationPricingSchemas } from '../../lib/schema/product_variation_pricing.js';

export const CollProductInformation = new Mongo.Collection('collproductinformation');
export const CollProductPrice = new Mongo.Collection('collproductpricing');
export const CollProductImprintData = new Mongo.Collection('collproductimprintdata');
export const CollProductImage = new Mongo.Collection('collproductimage');
export const CollProductShipping = new Mongo.Collection('collproductshipping');
export const CollProductAdditionalCharges = new Mongo.Collection('collProductadditionalcharges');
export const CollProductVariationPrice = new Mongo.Collection('collproductvariationprice');

export const CollUploadJobMaster = new Mongo.Collection('uploadJobMaster');

export const Csvfiles = new Mongo.Collection('csvfiles');
export const Csvfilemapping = new Mongo.Collection('csvfilemapping');


// add schema
CollProductInformation.attachSchema(ProductInformationSchema);
CollProductPrice.attachSchema(ProductPriceSchemas);
CollProductImprintData.attachSchema(ProductImprintDataSchemas);
CollProductImage.attachSchema(ProductImagesSchemas);
CollProductShipping.attachSchema(ProductShippingSchemas);
CollProductAdditionalCharges.attachSchema(ProductAdditionalChargeSchemas);
CollProductVariationPrice.attachSchema(ProductVariationPricingSchemas);
