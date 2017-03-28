let ProductInformation = [
  {
        columnName : 'SKU',
        errorString: "SKU field found blank , please provide valid data at row number",
        errorCode: 'SKUblankCheck400',
        fn : function(){
                		return bodybuilder()
                              .filter('exists', 'field', 'SKU')
                            .build();
                	}
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
        columnName : 'Country',
        errorString: "Country field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        fn: function(data)
        {
	           //blank Field Check Country
        		return bodybuilder()
                      .filter('exists', 'field', 'Country')
                    .build();
        }
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
        columnName : 'Language',
        errorString: "Language field found blank , please provide valid data at row number",
        errorCode: 'LanguageblankCheck400',
        fn: function(data)
        { //blank Field Check Language
      		return bodybuilder()
                    .filter('exists', 'field', 'Language')
                  .build();
        }
    },
    {
        columnName : 'Currency',
        errorString: "Currency field found blank , please provide valid data at row number",
        errorCode: 'CurrencyblankCheck400',
        fn: function()
        { //blankFieldCheck Currency
      		return bodybuilder()
                    .filter('exists', 'field', 'Currency')
                  .build();
        }
    },
    {
        columnName : 'Product_Name',
        errorString: "Product_Name field found blank , please provide valid data at row number",
        errorCode: 'Product_NameblankCheck400',
        fn: function()
        { //blank Field Check Product_Name
            return bodybuilder()
              			  .filter('exists', 'field', 'Product_Name')
            			  .build();
        }
    },


    // {
    //     columnName : 'Product_Name',
    //     errorString: "Product_Name field inavalid , please use alpha-Numeric value or '$' , '#' , '&' , '*' or '-' only at row number",
    //     errorCode: 'Product_NameRegEx400',
    //     fn: function(data)
    //     { //blank Field Check SKU
    //       var validReg = new RegExp("[^0-9a-zA-Z^$^#^&^*^-]");
    //       return !validReg.test(data.Product_Name);
    //     }
    // },
    // {
    //     columnName : 'Description',
    //     errorString: "Product_Name field inavalid , please use alpha-Numeric value or '$' , '#' , '&' , '*' or '-' only at row number",
    //     errorCode: 'Product_NameRegEx400',
    //     fn: function(data)
    //     { //blank Field Check SKU
    //       var validReg = new RegExp("[^0-9a-zA-Z^$^#^&^*^-]");
    //       return !validReg.test(data.Product_Name);
    //     }
    // },
    {
        columnName : 'Description',
        errorString: "Description field found blank , please provide valid data at row number",
        errorCode: 'DescriptionBlankCheck400',
        fn: function(data)
        { //blank Field Check Product_Name
          return bodybuilder()
                    .filter('exists', 'field', 'Description')
                  .build();;
        }
    },
    {
        columnName : 'Linename',
        errorString: "Linename field found blank , please provide valid data at row number",
        errorCode: 'LinenameBlankCheck400',
        fn: function(data)
        { //blank Field Check Product_Name
          return bodybuilder()
                    .filter('exists', 'field', 'Linename')
                  .build();;
        }
    },
    {
        columnName : 'Categories',
        errorString: "Categories field found blank , please provide valid data at row number",
        errorCode: 'CategoriesBlankCheck400',
        fn: function(data)
        { //blank Field Check Product_Name
          return bodybuilder()
                    .filter('exists', 'field', 'Categories')
                  .build();
        }
    },
    {

        columnName : 'Search_Keyword',
        errorString: "Search_Keyword field found blank , please provide valid data at row number",
        errorCode: 'Search_KeywordBlankCheck400',
        fn: function(data)
        { //blank Field Check Product_Name
          return bodybuilder()
                    .filter('exists', 'field', 'Search_Keyword')
                  .build();
        }
    },
    {
        columnName : 'Default_Image',
        errorString: "Default_Image field found blank , please provide valid data at row number",
        errorCode: 'Default_ImageBlankCheck400',
        fn: function(data)
        { //blank Field Check Product_Name
          return bodybuilder()
                    .filter('exists', 'field', 'Default_Image')
                  .build();
        }
    }
];
