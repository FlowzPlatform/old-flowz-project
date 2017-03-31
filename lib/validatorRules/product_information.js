export const ProductInformationRules = [{
        columnName: 'sku',
        errorString: "SKU field found blank , please provide valid data at row number",
        errorCode: 'SKUblankCheck400',
        qryMongo: { "sku": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "sku"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "sku"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "sku": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
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
        columnName: 'country',
        errorString: "Country field found blank , please provide valid data at row number",
        errorCode: 'CountryblankCheck400',
        qryMongo: { "country": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "sku"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "sku"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "country": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
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
        columnName: 'language',
        errorString: "Language field found blank , please provide valid data at row number",
        errorCode: 'LanguageblankCheck400',
        qryMongo: { "language": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "language"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "language"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "language": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        columnName: 'currency',
        errorString: "Currency field found blank , please provide valid data at row number",
        errorCode: 'CurrencyblankCheck400',
        qryMongo: { "currency": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "currency"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "currency"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "currency": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        columnName: 'product_name',
        errorString: "Product_Name field found blank , please provide valid data at row number",
        errorCode: 'Product_NameblankCheck400',
        qryMongo: { "product_name": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "product_name"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "product_name"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "product_name": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
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
        qryMongo: { "description": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "description"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "description"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "description": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        columnName: 'linename',
        errorString: "Linename field found blank , please provide valid data at row number",
        errorCode: 'LinenameBlankCheck400',
        qryMongo: { "linename": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "linename"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "linename"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "linename": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        columnName: 'categories',
        errorString: "Categories field found blank , please provide valid data at row number",
        errorCode: 'CategoriesBlankCheck400',
        qryMongo: { "categories": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "categories"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "categories"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "categories": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    },
    {

        columnName: 'search_keyword',
        errorString: "Search_Keyword field found blank , please provide valid data at row number",
        errorCode: 'Search_KeywordBlankCheck400',
        qryMongo: { "search_keyword": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "search_keyword"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "search_keyword"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "search_keyword": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        columnName: 'default_image',
        errorString: "Default_Image field found blank , please provide valid data at row number",
        errorCode: 'Default_ImageBlankCheck400',
        qryMongo: { "default_image": "" },
        qryES: {
            "query": {
                "bool": {
                    "should": [{
                            "bool": {
                                "must_not": [{
                                    "exists": {
                                        "field": "default_image"
                                    }
                                }]
                            }
                        },
                        {
                            "bool": {
                                "must": [{
                                    "exists": {
                                        "field": "default_image"
                                    }
                                }],
                                "must_not": [{
                                    "wildcard": {
                                        "default_image": "*"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    }
];