import { Mongo } from 'meteor/mongo';

export const CollProductInformation = new Mongo.Collection('collproductinformation');
export const CollProductPricing = new Mongo.Collection('collproductpricing');
export const CollProductImprintData = new Mongo.Collection('collproductimprintdata');
export const CollProductImage = new Mongo.Collection('collproductimage');
export const CollProductShipping = new Mongo.Collection('collproductshipping');
export const CollProductAdditionalCharges = new Mongo.Collection('collProductadditionalcharges');
export const CollProductVariationPrice = new Mongo.Collection('collproductvariationprice');
export const Csvfiles = new Mongo.Collection('csvfiles');
export const Csvfilemapping = new Mongo.Collection('csvfilemapping');