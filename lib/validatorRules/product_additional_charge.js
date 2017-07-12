import SimpleSchema from 'simpl-schema';

export const ProductAdditionalChargesRules = [
  {
    columnName : 'product_sku',
    errorString: "SKU field found blank",
    errorCode: 'SKUblankCheck400',
    qryMongo : {"sku":""},
    qryES : {}
  },
  {
    columnName : 'charge_name',
    errorString: "Charge_Name field found blank",
    errorCode: 'Charge_NameblankCheck400',
    qryMongo : {"charge_name":""},
    qryES : {}
  },
  {
    columnName : 'option_name',
    errorString: "Option_Name field found blank",
    errorCode: 'Option_NameblankCheck400',
    qryMongo : {"option_name":""},
    qryES : {}
  },
  {
    columnName : 'moq',
    errorString: "moq field found blank",
    errorCode: 'moqblankCheck400',
    qryMongo : {"moq":""},
    qryES : {}
  },
  {
    columnName : 'qty_1_min',
    errorString: "Qty_1_min field found blank",
    errorCode: 'qty_1_minblankCheck400',
    qryMongo : {"qty_1_min":""},
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
  },
  {
      columnName : 'net_price_1',
      errorString: "net_price_1 field should contain data of double data type",
      errorCode: 'net_price_1blankCheck400',
      qryMongo : {$where:{"net_price_1":{$ne:{$type:"double"}}}},
      qryES : {}
  }
];
