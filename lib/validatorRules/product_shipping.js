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
      errorString: "shipping_qty_per_carton field should contain data of double data type",
      errorCode: 'shipping_qty_per_cartonblankCheck400',
      qryMongo : {$where:{"shipping_qty_per_carton":{$ne:{$type:"double"}}}},
      qryES : {}
  },
  {
      columnName : 'carton_length',
      errorString: "carton_length field should contain data of double data type",
      errorCode: 'carton_lengthblankCheck400',
      qryMongo : {$where:{"carton_length":{$ne:{$type:"double"}}}},
      qryES : {}
  }

]
