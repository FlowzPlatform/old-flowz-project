import SimpleSchema from 'simpl-schema';

export const ProductImageRules = [
  {
    columnName : 'sku',
    errorString: "SKU field found blank",
    errorCode: 'SKUblankCheck400',
    qryMongo : {"sku":""},
    qryES : {}
  }
];
