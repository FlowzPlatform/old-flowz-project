export const ProductShippingRules = [
  {
    columnName : 'sku',
    errorString: "SKU field found blank",
    errorCode: 'SKUblankCheck400',
    qryMongo : {"sku":""},
    qryES : {}
  },
  {
    columnName : 'fob_city',
    errorString: "Free_On_Board_City field found blank",
    errorCode: 'Free_On_Board_CityblankCheck400',
    qryMongo : {"fob_city":""},
    qryES : {}
  },
  {
    columnName : 'fob_state_code',
    errorString: "Free_On_Board_State_Code field found blank",
    errorCode: 'Free_On_Board_State_CodeblankCheck400',
    qryMongo : {"fob_state_code":""},
    qryES : {}
  },
  {
    columnName : 'fob_country_code',
    errorString: "Free_On_Board_Country_Code field found blank",
    errorCode: 'Free_On_Board_Country_CodeblankCheck400',
    qryMongo : {"fob_country_code":""},
    qryES : {}
  },
  {
    columnName : 'fob_zip_code',
    errorString: "Free_On_Board_Zip_Code field found blank",
    errorCode: 'Free_On_Board_Zip_CodeblankCheck400',
    qryMongo : {"fob_zip_code":""},
    qryES : {}
  },
  {
    columnName : 'shipping_qty_per_carton',
    errorString: "Shipping_Qty_Per_Carton field found blank",
    errorCode: 'Shipping_Qty_Per_CartonblankCheck400',
    qryMongo : {"shipping_qty_per_carton":""},
    qryES : {}
  },
  {
      columnName : 'shipping_qty_per_carton',
      errorString: "shipping_qty_per_carton field invalid, please input numeric value",
      errorCode: 'shipping_qty_per_cartonRegEx400',
      qryMongo : {$and:
      [{ "shipping_qty_per_carton": { $exists: true, $ne: null } },
       { "shipping_qty_per_carton" : {$not: /^\d{0,8}(\.\d{0,4})?$/ }}
   ]
   }
 },
  {
      columnName : 'carton_length',
      errorString: "carton_length field invalid, please input numeric value",
      errorCode: 'carton_lengthRegEx400',
      qryMongo : {$and:
      [{ "carton_length": { $exists: true, $ne: null } },
       { "carton_length" : {$not: /^\d{0,8}(\.\d{0,4})?$/ }}
   ]
   }
 }
];
