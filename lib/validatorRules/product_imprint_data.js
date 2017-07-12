import SimpleSchema from 'simpl-schema';

export const ProductImprintDataRules = [
  {
    columnName : 'sku',
    errorString: "SKU field found blank",
    errorCode: 'SKUblankCheck400',
    qryMongo : {"sku":""},
    qryES : {}
  },
  {
    columnName : 'imprint_position',
    errorString: "Imprint_Position field found blank",
    errorCode: 'Imprint_PositionblankCheck400',
    qryMongo : {"imprint_position":""},
    qryES : {}
  },
  {
    columnName : 'imprint_method',
    errorString: "Imprint_Method field found blank",
    errorCode: 'Imprint_MethodblankCheck400',
    qryMongo : {"imprint_method":""},
    qryES : {}
  },
  {
    columnName : 'qty_1_min',
    errorString: "qty_1_min field found blank",
    errorCode: 'qty_1_minblankCheck400',
    qryMongo : {"qty_1_min":""},
    qryES : {}
  },
  {
    columnName : 'qty_1_max',
    errorString: "qty_1_max field found blank",
    errorCode: 'qty_1_maxblankCheck400',
    qryMongo : {"qty_1_max":""},
    qryES : {}
  },
  {
    columnName : 'price_1',
    errorString: "Price_1 field found blank",
    errorCode: 'price_1blankCheck400',
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
]
