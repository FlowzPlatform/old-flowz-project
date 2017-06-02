import { Mongo } from 'meteor/mongo';

// import schema
import { ProductInformationSchema } from '../../lib/schema/product_information.js';
import { ProductAdditionalChargeSchemas } from '../../lib/schema/product_additional_charge.js';
import { ProductImagesSchemas } from '../../lib/schema/product_images.js';
import { ProductImprintDataSchemas } from '../../lib/schema/product_imprint_data.js';
import { ProductPriceSchemas } from '../../lib/schema/product_price.js';
import { ProductShippingSchemas } from '../../lib/schema/product_shipping.js';
import { ProductVariationPricingSchemas } from '../../lib/schema/product_variation_pricing.js';

const collectionPrefix = 'uploader';

export const CollProductInformation = new Mongo.Collection(collectionPrefix + 'Productinformation');
export const CollProductPrice = new Mongo.Collection(collectionPrefix + 'Productprice');
export const CollProductImprintData = new Mongo.Collection(collectionPrefix + 'Productimprintdata');
export const CollProductImage = new Mongo.Collection(collectionPrefix + 'Productimage');
export const CollProductShipping = new Mongo.Collection(collectionPrefix + 'Productshipping');
export const CollProductAdditionalCharges = new Mongo.Collection(collectionPrefix + 'Productadditionalcharges');
export const CollProductVariationPrice = new Mongo.Collection(collectionPrefix + 'Productvariationprice');
export const CollUploaderSchema = new Mongo.Collection(collectionPrefix + 'Schema');
export const CollUploadJobMaster = new Mongo.Collection(collectionPrefix + 'JobMaster');
export const Csvfiles = new Mongo.Collection(collectionPrefix + 'CSVFiles');
export const Csvfilemapping = new Mongo.Collection(collectionPrefix + 'CSVFileMapping');

export const CollCloseOutPromoRFQSent = new Mongo.Collection('closeOutPromoRFQSent');
export const CollCloseOutPromoRFQDiscussion = new Mongo.Collection('closeOutPromoRFQDiscussion');

