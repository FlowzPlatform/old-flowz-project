import SimpleSchema from 'simpl-schema';

export const ProductVariationPriceRules = [
  {
    columnName : 'sku',
    errorString: "SKU field found blank",
    errorCode: 'SKUblankCheck400',
    qryMongo : {"sku":""},
    qryES : {}
  },
  {
    columnName : 'variation_label',
    errorString: "Variation_Label field found blank",
    errorCode: 'Variation_LabelblankCheck400',
    qryMongo : {"variation_label":""},
    qryES : {}
  },
  {
    columnName : 'type',
    errorString: "Type field found blank",
    errorCode: 'TypeblankCheck400',
    qryMongo : {"type":""},
    qryES : {}
  },
  {
    columnName : 'global_price_type',
    errorString: "Global_Price_Type field found blank",
    errorCode: 'Global_Price_TypeblankCheck400',
    qryMongo : {"global_price_type":""},
    qryES : {}
  },
  {
      columnName : 'qty_1_min',
      errorString: "Product qty field found blank",
      errorCode: 'Product_QtyblankCheck400',
      qryMongo : {"qty_1_min":""},
      qryES : {}
  },
  {
      columnName : 'qty_1_max',
      errorString: "`qty_1_max` should be greater than `qty_1_min`",
      errorCode: 'qty_1_maxblankCheck400',
      qryMongo : {$where : "this.qty_1_min > this.qty_1_max"},
      qryES : {}
  },
  {
      columnName : 'qty_2_min',
      errorString: "`qty_2_min` should be greater than `qty_1_max`",
      errorCode: 'qty_2_minblankCheck400',
      qryMongo : {$where : "this.qty_1_max > this.qty_2_min"},
      qryES : {}
  },
  {
      columnName : 'qty_2_max',
      errorString: "`qty_2_max` should be greater than `qty_2_min`",
      errorCode: 'qty_2_maxblankCheck400',
      qryMongo : {$where : "this.qty_2_min > this.qty_2_max"},
      qryES : {}
  },
  {
      columnName : 'qty_3_min',
      errorString: "`qty_3_min` should be greater than `qty_2_max`",
      errorCode: 'qty_3_minblankCheck400',
      qryMongo : {$where : "this.qty_2_max > this.qty_3_min"},
      qryES : {}
  },
  {
      columnName : 'qty_3_max',
      errorString: "`qty_3_max` should be greater than `qty_3_min`",
      errorCode: 'qty_3_maxblankCheck400',
      qryMongo : {$where : "this.qty_3_min > this.qty_3_max"},
      qryES : {}
  },
  {
      columnName : 'qty_4_min',
      errorString: "`qty_4_min` should be greater than `qty_3_max`",
      errorCode: 'qty_4_minblankCheck400',
      qryMongo : {$where : "this.qty_3_max > this.qty_4_min"},
      qryES : {}
  },
  {
      columnName : 'qty_4_max',
      errorString: "`qty_4_max` should be greater than `qty_4_min`",
      errorCode: 'qty_4_maxblankCheck400',
      qryMongo : {$where : "this.qty_4_min > this.qty_4_max"},
      qryES : {}
  },
  {
      columnName : 'qty_5_min',
      errorString: "`qty_5_min` should be greater than `qty_4_max`",
      errorCode: 'qty_5_minblankCheck400',
      qryMongo : {$where : "this.qty_4_max > this.qty_5_min"},
      qryES : {}
  },
  {
      columnName : 'qty_5_max',
      errorString: "`qty_5_max` should be greater than `qty_5_min`",
      errorCode: 'qty_5_maxblankCheck400',
      qryMongo : {$where : "this.qty_5_min > this.qty_5_max"},
      qryES : {}
  },
  {
      columnName : 'qty_6_min',
      errorString: "`qty_6_min` should be greater than `qty_5_max`",
      errorCode: 'qty_6_minblankCheck400',
      qryMongo : {$where : "this.qty_5_max > this.qty_6_min"},
      qryES : {}
  },
  {
      columnName : 'qty_6_max',
      errorString: "`qty_6_max` should be greater than `qty_6_min`",
      errorCode: 'qty_6_maxblankCheck400',
      qryMongo : {$where : "this.qty_6_min > this.qty_6_max"},
      qryES : {}
  },
  {
      columnName : 'qty_7_min',
      errorString: "`qty_7_min` should be greater than `qty_6_max`",
      errorCode: 'qty_7_minblankCheck400',
      qryMongo : {$where : "this.qty_6_max > this.qty_7_min"},
      qryES : {}
  },
  {
      columnName : 'qty_7_max',
      errorString: "`qty_7_max` should be greater than `qty_7_min`",
      errorCode: 'qty_7_maxblankCheck400',
      qryMongo : {$where : "this.qty_7_min > this.qty_7_max"},
      qryES : {}
  },
  {
      columnName : 'qty_8_min',
      errorString: "`qty_8_min` should be greater than `qty_7_max`",
      errorCode: 'qty_8_minblankCheck400',
      qryMongo : {$where : "this.qty_7_max > this.qty_8_min"},
      qryES : {}
  },
  {
      columnName : 'qty_8_max',
      errorString: "`qty_8_max` should be greater than `qty_8_min`",
      errorCode: 'qty_8_maxblankCheck400',
      qryMongo : {$where : "this.qty_8_min > this.qty_8_max"},
      qryES : {}
  },
  {
      columnName : 'qty_9_min',
      errorString: "`qty_9_min` should be greater than `qty_8_max`",
      errorCode: 'qty_9_minblankCheck400',
      qryMongo : {$where : "this.qty_8_max > this.qty_9_min"},
      qryES : {}
  },
  {
      columnName : 'qty_9_max',
      errorString: "`qty_9_max` should be greater than `qty_9_min`",
      errorCode: 'qty_9_maxblankCheck400',
      qryMongo : {$where : "this.qty_9_min > this.qty_9_max"},
      qryES : {}
  },
  {
      columnName : 'qty_10_min',
      errorString: "`qty_10_min` should be greater than `qty_9_max`",
      errorCode: 'qty_10_minblankCheck400',
      qryMongo : {$where : "this.qty_9_max > this.qty_10_min"},
      qryES : {}
  },
  {
      columnName : 'qty_10_max',
      errorString: "`qty_10_max` should be greater than `qty_10_min`",
      errorCode: 'qty_10_maxblankCheck400',
      qryMongo : {$where : "this.qty_10_min > this.qty_10_max"},
      qryES : {}
  },
  {
      columnName : 'qty_11_min',
      errorString: "`qty_11_min` should be greater than `qty_10_max`",
      errorCode: 'qty_11_minblankCheck400',
      qryMongo : {$where : "this.qty_10_max > this.qty_11_min"},
      qryES : {}
  },
  {
      columnName : 'qty_11_max',
      errorString: "`qty_11_max` should be greater than `qty_11_min`",
      errorCode: 'qty_11_maxblankCheck400',
      qryMongo : {$where : "this.qty_11_min > this.qty_11_max"},
      qryES : {}
  },
  {
      columnName : 'qty_12_min',
      errorString: "`qty_12_min` should be greater than `qty_11_max`",
      errorCode: 'qty_12_minblankCheck400',
      qryMongo : {$where : "this.qty_11_max > this.qty_12_min"},
      qryES : {}
  },
  {
      columnName : 'qty_12_max',
      errorString: "`qty_12_max` should be greater than `qty_12_min`",
      errorCode: 'qty_12_maxblankCheck400',
      qryMongo : {$where : "this.qty_12_min > this.qty_12_max"},
      qryES : {}
  },
  {
      columnName : 'qty_13_min',
      errorString: "`qty_13_min` should be greater than `qty_12_max`",
      errorCode: 'qty_13_minblankCheck400',
      qryMongo : {$where : "this.qty_12_max > this.qty_13_min"},
      qryES : {}
  },
  {
      columnName : 'qty_13_max',
      errorString: "`qty_13_max` should be greater than `qty_13_min`",
      errorCode: 'qty_13_maxblankCheck400',
      qryMongo : {$where : "this.qty_13_min > this.qty_13_max"},
      qryES : {}
  },
  {
      columnName : 'qty_14_min',
      errorString: "`qty_14_min` should be greater than `qty_13_max`",
      errorCode: 'qty_14_minblankCheck400',
      qryMongo : {$where : "this.qty_13_max > this.qty_14_min"},
      qryES : {}
  },
  {
      columnName : 'qty_14_max',
      errorString: "`qty_14_max` should be greater than `qty_14_min`",
      errorCode: 'qty_14_maxblankCheck400',
      qryMongo : {$where : "this.qty_14_min > this.qty_14_max"},
      qryES : {}
  },
  {
      columnName : 'qty_15_min',
      errorString: "`qty_15_min` should be greater than `qty_14_max`",
      errorCode: 'qty_15_minblankCheck400',
      qryMongo : {$where : "this.qty_14_max > this.qty_15_min"},
      qryES : {}
  },
  {
      columnName : 'qty_15_max',
      errorString: "`qty_15_max` should be greater than `qty_15_min`",
      errorCode: 'qty_15_maxblankCheck400',
      qryMongo : {$where : "this.qty_15_min > this.qty_15_max"},
      qryES : {}
  },
  {
    columnName : 'price_1',
    errorString: "Price_1 field found blank",
    errorCode: 'Price_1blankCheck400',
    qryMongo : {"price_1":""},
    qryES : {}
  },
  {
      columnName : 'price_1',
      errorString: "price_1 field should contain data of double data type",
      errorCode: 'price_1blankCheck400',
      qryMongo : {$where:{"price_1":{$ne:{$type:"double"}}}},
      qryES : {}
  }
];
