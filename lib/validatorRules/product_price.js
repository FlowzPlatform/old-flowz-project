export const ProductPriceRules = [
  {
        columnName : 'sku',
        errorString: "SKU field found blank",
        errorCode: 'SKUblankCheck400',
        qryMongo : {"sku":""},
        qryES : {}
    },
    {
        columnName : 'price_type',
        errorString: "Price Type field found blank",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"price_type":""},
        qryES : {}
    },
    {
        columnName : 'type',
        errorString: "Type field found blank",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"type":""},
        qryES : {}
    },
    {
        columnName : 'global_price_type',
        errorString: "global price type field found blank",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"global_price_type":""},
        qryES : {}
    },
    {
        columnName : 'price_unit',
        errorString: "price unit field found blank",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"price_unit":""},
        qryES : {}
    },
    {
        columnName : 'qty_1_min',
        errorString: "Product qty field found blank",
        errorCode: 'Product_NameblankCheck400',
        qryMongo : {"qty_1_min":""},
        qryES : {}
    },
    {
        columnName : 'qty_1_max',
        errorString: "`qty_1_max` should be greater than `qty_1_min`",
        errorCode: 'qty_1_minblankCheck400',
        qryMongo : {$where : "this.qty_1_min > this.qty_1_max"},
        qryES : {}
    },
    {
        columnName : 'qty_2_min',
        errorString: "`qty_2_min` should be greater than `qty_1_max`",
        errorCode: 'qty_2_minblankCheck400',
        qryMongo : {$where : "this.qty_1_min > this.qty_2_min"},
        qryES : {}
    }
];
