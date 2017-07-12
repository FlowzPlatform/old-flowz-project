export const ProductInformationRules = [{
        columnName: 'sku',
        errorString: "SKU field found blank , please provide valid data at row number",
        errorCode: 'SKUblankCheck400',
        qryMongo: { "sku": "" }
    },
    /*
    {
          columnName : 'SKU',
          errorString: "SKU field inavalid , please use alpha-Numeric value or '$' , '#' , '&' , '*' or '-' only at row number",
          errorCode: 'SkuRegex400',
          fn: function()
          { //blank Field Check SKU
            	return bodybuilder()
              			.notQuery('regexp', 'SKU', '^0-9a-zA-Z^$^#^&^*^-')
              			.build();
          }
    },
    */
    {
        columnName: 'country',
        errorString: "Country field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        qryMongo: { "country": "" }
    },
    /*{
        columnName : 'Country',
        errorString: "Country field is invalid , it must be a string at row number",
        errorCode: 'CountryRegex400',
        fn: function(data)
        { //blank Field Check Country
		return bodybuilder()
			.notQuery('regexp', 'Country', '^a-zA-Z^ ')
			.build();
        }
    },
    */
    {
        columnName: 'language',
        errorString: "Language field found blank , please provide valid data at row number",
        errorCode: 'LanguageblankCheck400',
        qryMongo: { "language": "" }
    },
    {
        columnName: 'currency',
        errorString: "Currency field found blank , please provide valid data at row number",
        errorCode: 'CurrencyblankCheck400',
        qryMongo: { "currency": "" }
    },
    {
        columnName: 'product_name',
        errorString: "Product_Name field found blank , please provide valid data at row number",
        errorCode: 'Product_NameblankCheck400',
        qryMongo: { "product_name": "" }
    },


    // {
    //     columnName : 'Product_Name',
    //     errorString: "Product_Name field inavalid , please use alpha-Numeric value or '$' , '#' , '&' , '*' or '-' only at row number",
    //     errorCode: 'Product_NameRegEx400',
    //     fn: function(data)
    //     { //blank Field Check SKU
    //       var validReg = new RegExp("[^0-9a-zA-Z^$^#^&^*^-]");
    //       return !validReg.test(Product_Name);
    //     }
    // },
    // {
    //     columnName : 'Description',
    //     errorString: "Product_Name field inavalid , please use alpha-Numeric value or '$' , '#' , '&' , '*' or '-' only at row number",
    //     errorCode: 'Product_NameRegEx400',
    //     fn: function(data)
    //     { //blank Field Check SKU
    //       var validReg = new RegExp("[^0-9a-zA-Z^$^#^&^*^-]");
    //       return !validReg.test(Product_Name);
    //     }
    // },
    {
        columnName: 'description',
        errorString: "Description field found blank , please provide valid data at row number",
        errorCode: 'DescriptionBlankCheck400',
        qryMongo: { "description": "" }
    },
    {
        columnName: 'linename',
        errorString: "Linename field found blank , please provide valid data at row number",
        errorCode: 'LinenameBlankCheck400',
        qryMongo: { "linename": "" }
    },
    {
        columnName: 'categories',
        errorString: "Categories field found blank , please provide valid data at row number",
        errorCode: 'CategoriesBlankCheck400',
        qryMongo: { "categories": "" }
    },
    {

        columnName: 'search_keyword',
        errorString: "Search_Keyword field found blank , please provide valid data at row number",
        errorCode: 'Search_KeywordBlankCheck400',
        qryMongo: { "search_keyword": "" }
    },
    {
        columnName: 'default_image',
        errorString: "Default_Image field found blank , please provide valid data at row number",
        errorCode: 'Default_ImageBlankCheck400',
        qryMongo: { "default_image": "" }
    },
    {
        columnName : 'matrix_price',
        errorString: "Matrix_Price field should contain data of double data type",
        errorCode: 'matrix_priceblankCheck400',
        qryMongo : {$where:{"matrix_price":{$ne:{$type:"double"}}}},
        qryES : {}
    },
    {
        columnName : 'matrix_freight',
        errorString: "Matrix_Freight field should contain data of double data type",
        errorCode: 'matrix_freightblankCheck400',
        qryMongo : {$where:{"matrix_freight":{$ne:{$type:"double"}}}},
        qryES : {}
    },
    {
        columnName : 'vat',
        errorString: "vat field should contain data of double data type",
        errorCode: 'vatblankCheck400',
        qryMongo : {$where:{"vat":{$ne:{$type:"double"}}}},
        qryES : {}
    },
    {
        columnName : 'packaging_charges',
        errorString: "Packaging_Charges field should contain data of double data type",
        errorCode: 'packaging_chargesblankCheck400',
        qryMongo : {$where:{"packaging_charges":{$ne:{$type:"double"}}}},
        qryES : {}
    }
];
