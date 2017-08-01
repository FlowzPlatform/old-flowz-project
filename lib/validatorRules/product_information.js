export const ProductInformationRules = [{
        columnName: 'sku',
        errorString: "SKU field found blank , please provide valid data at row number",
        errorCode: 'SKUblankCheck400',
        qryMongo: {$or:[{"sku":null},{"sku":""}]}
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
        qryMongo: {$or:[{"country":null},{"country":""}]}
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
        qryMongo: {$or:[{"language":null},{"language":""}]}
    },
    {
        columnName: 'currency',
        errorString: "Currency field found blank , please provide valid data at row number",
        errorCode: 'CurrencyblankCheck400',
        qryMongo: {$or:[{"currency":null},{"currency":""}]}
    },
    {
        columnName: 'product_name',
        errorString: "Product_Name field found blank , please provide valid data at row number",
        errorCode: 'Product_NameblankCheck400',
        qryMongo: {$or:[{"product_name":null},{"product_name":""}]}
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
        qryMongo: {$or:[{"description":null},{"description":""}]}
    },
    {
        columnName: 'linename',
        errorString: "Linename field found blank , please provide valid data at row number",
        errorCode: 'LinenameBlankCheck400',
        qryMongo: {$or:[{"linename":null},{"linename":""}]}
    },
    {
        columnName: 'categories',
        errorString: "Categories field found blank , please provide valid data at row number",
        errorCode: 'CategoriesBlankCheck400',
        qryMongo: {$or:[{"categories":null},{"categories":""}]}
    },
    {

        columnName: 'search_keyword',
        errorString: "Search_Keyword field found blank , please provide valid data at row number",
        errorCode: 'Search_KeywordBlankCheck400',
        qryMongo: {$or:[{"search_keyword":null},{"search_keyword":""}]}
    },
    {
        columnName: 'default_image',
        errorString: "Default_Image field found blank , please provide valid data at row number",
        errorCode: 'Default_ImageBlankCheck400',
        qryMongo: {$or:[{"default_image":null},{"default_image":""}]}
    },
    {
        columnName : 'matrix_price',
        errorString: "Matrix_Price field invalid, please input numeric value",
        errorCode: 'Matrix_PriceRegEx400',
        qryMongo : {$and:
        [{ "matrix_price": { $exists: true, $ne: null } },
         { "matrix_price" : {$not: /^\d{0,8}(\.\d{0,4})?$/ }}
     ]
     }
   },
    {
        columnName : 'matrix_frieght',
        errorString: "Matrix_Freight field invalid, please input numeric value",
        errorCode: 'Matrix_FreightRegEx400',
        qryMongo : {$and:
        [{ "matrix_frieght": { $exists: true, $ne: null } },
         { "matrix_frieght" : {$not: /^\d{0,8}(\.\d{0,4})?$/ }}
     ]
     }
   },
    {
        columnName : 'vat',
        errorString: "vat field invalid, please input numeric value",
        errorCode: 'VatRegEx400',
        qryMongo : {$and:
        [{ "vat": { $exists: true, $ne: null } },
         { "vat" : {$not: /^\d{0,8}(\.\d{0,4})?$/ }}
     ]
     }
   },
   {
       columnName : 'packaging_charges',
       errorString: "Packaging_Charges field invalid, please input numeric value",
       errorCode: 'packaging_chargesRegEx400',
       qryMongo : {$and:
       [{ "packaging_charges": { $exists: true, $ne: null } },
        { "packaging_charges" : {$not: /^\d{0,8}(\.\d{0,4})?$/ }}
    ]
    }
  },
//   {
//       columnName : 'valid_up_to',
//       errorString: "Valid_Up_To field invalid, please input in a proper date format (yyyy-mm-dd)",
//       errorCode: 'valid_up_toRegEx400',
//       qryMongo : {$and:
//       [{ "valid_up_to": { $exists: true, $ne: null } },
//        { "valid_up_to" : {$not: /^\d{4}-\d{2}-\d{2}$/ }}
//    ]
//    }
//  },
//  {
//      columnName : 'special_price_valid_up_to',
//      errorString: "Special_Price_Valid_Up_To field invalid, please input in a proper date format (yyyy-mm-dd)",
//      errorCode: 'special_price_valid_up_toRegEx400',
//      qryMongo : {$and:
//      [{ "special_price_valid_up_to": { $exists: true, $ne: null } },
//       { "special_price_valid_up_to" : {$not: /^\d{4}-\d{2}-\d{2}$/ }}
//   ]
//   }
// },
{
    columnName : 'video_url',
    errorString: "Video_URL field invalid, please input a valid URL",
    errorCode: 'Video_URLRegEx400',
    qryMongo : {$and:
    [{ "video_url": { $exists: true, $ne: null } },
     { "video_url" : {$not: /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/ }}
 ]
 }
},
{
    columnName : 'distributor_central_url',
    errorString: "Distributor_Central_URL field invalid, please input a valid URL",
    errorCode: 'Distributor_Central_URLRegEx400',
    qryMongo : {$and:
    [{ "distributor_central_url": { $exists: true, $ne: null } },
     { "distributor_central_url" : {$not: /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/ }}
 ]
 }
}
];
