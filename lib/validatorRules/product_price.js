export const ProductPriceRules = [
  {
        columnName : 'sku',
        errorString: "SKU field found blank , please provide valid data at row number",
        errorCode: 'SKUblankCheck400',
        qryMongo : {"sku":""},
        qryES : {}
    },
    {
        columnName : 'price_type',
        errorString: "Price Type field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"price_type":""},
        qryES : {}
    },
    {
        columnName : 'type',
        errorString: "Type field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"type":""},
        qryES : {}
    },
    {
        columnName : 'global_price_type',
        errorString: "global price type field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"global_price_type":""},
        qryES : {}
    },
    {
        columnName : 'price_unit',
        errorString: "price unit field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        qryMongo : {"price_unit":""},
        qryES : {}
    },
    {
        columnName : 'qty_1_min',
        errorString: "Product qty field found blank , please provide valid data at row number",
        errorCode: 'Product_NameblankCheck400',
        qryMongo : {"qty_1_min":""},
        qryES : {}
    }
];
