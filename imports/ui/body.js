import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
// import { UploadedFiles } from '../lib/collections.js';
// import  Headers
import { ProductInformationHeaders } from '../../lib/headers/product_information.js'
import { ProductPriceHeaders } from '../../lib/headers/product_price.js'
import { ProductImprintDataHeaders } from '../../lib/headers/product_imprint_data.js'
import { ProductImageHeaders } from '../../lib/headers/product_images.js'
import { ProductShippingHeaders } from '../../lib/headers/product_shipping.js'
import { ProductAdditionalChargeHeaders } from '../../lib/headers/product_additional_charge.js'
import { ProductVariationPricingHeaders } from '../../lib/headers/product_variation_pricing.js'


// import  collections

import { CollProductInformation, CollProductPrice, CollProductImprintData, CollProductImage, CollProductShipping, CollProductAdditionalCharges, CollProductVariationPrice } from '../api/collections.js';
import { Csvfiles } from '../api/collections.js';
import { Csvfilemapping } from '../api/collections.js';
import { CollUploadJobMaster } from '../api/collections.js';

import './body.html';


let abortChecked = false;
let editor;
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('lll');
});


Template.imageUpload.onRendered(function() {
  document.getElementById('btnUploadCsv').focus();
  $('.imageOrFileButton').on('click', function(){
    $('.imageOrFileButton').removeClass('active');
    $(this).addClass('active');
  });
    //this.csv_files = new ReactiveArray();

    // Meteor.Dropzone.options.maxFiles = 1;
    //  Meteor.Dropzone.options.previewTemplate = '<div id="preview-template" >';
    Meteor.Dropzone.options.dictDefaultMessage = '<p class="first">Drag and drop images here to upload</p>   <p class="second">(only .jpg , .png and .gif files are allowed)</p>';
    //Meteor.Dropzone.options.addRemoveLinks = true;
    //Meteor.Dropzone.options.dictRemoveFile = "Remove File"; // Remove button text

    //Meteor.Dropzone.options.acceptedFiles = 'image/jpeg,image/png,image/gif';
    Meteor.Dropzone.options.acceptedFiles = '.jpg';
    Meteor.Dropzone.options.autoProcessQueue = true;
    Meteor.Dropzone.options.parallelUploads = 5; // Number of parallel upload file
    Meteor.Dropzone.options.processingmultiple = false;
    Meteor.Dropzone.options.uploadMultiple = false;

    var options = _.extend({}, Meteor.Dropzone.options, this.data);
    this.dropzone = new Dropzone('#my-awesome-dropzone.dropzone', options);

    var self = this;

    // this is how you get the response from the ajax call.
    this.dropzone.on('addedfile', function(file) {
        console.log("fileName:", file);
        //  UploadedFiles.insert(file.name, function(e, res) {
        //    if (e) {
        //      log(e);
        //    }
        //    console.log("inserted into mongo collection");
        //  })
    });
    this.dropzone.on('complete', function(file) {

        var uploader = new Slingshot.Upload("myFileUploads");

        uploader.send(file, function(error, downloadUrl) {
            if (error) {
                // Log service detailed response.
                console.error('Error uploading');
                console.log(error);
            } else {
                console.log("success");
                //  Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
            }
        });


        //FS.Utility.eachFile(e, function(file) {
        //  var newFile = new FS.File(file);
        console.log(file);
        //   Images.insert(file, function (error, fileObj) {
        //     if (error) {
        //       toastr.error("Upload failed... please try again.");
        //     } else {
        //       toastr.success('Upload succeeded!');
        //     }
        // });
        // });
    });

    this.dropzone.on("uploadprogress", function(file, progress) {
        // Update progress bar with the value in the variable "progress", which
        // is the % total upload progress from 0 to 100

        console.log("progress:", progress);

    });

    this.dropzone.on('queuecomplete', function() {
        console.log("queuecomplete");


        //location.reload();
        //Router.go("uploaded_file", mergeObjects(Router.currentRouteParams(), {}));
    });

    this.dropzone.on('accept', function(file) {
        alert(4)
    })
    dz = this.dropzone;
})

Template.readCSV.events({
    "click #btngostep2": function(event, template) {
        let Id = CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running', stepStatus: 'upload_pending' })._id;
        CollUploadJobMaster.update(Id, { $set: { stepStatus: 'validation_running' } }, function() {
            Router.go('/validation');
        });
    },
    "click #btnAbortRecord": function(event, template) {
        swal({
                title: "Are you sure?",
                text: "All your existing uploaded data will be deleted and you have to upload the files again",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Abort it!",
                closeOnConfirm: true
            },
            function() {
                template.abortData.set(false);
                toastr.success("Your data has been successfully deleted.");
            });
    },
    "click .sheets": function(event, template) {
        var currentEl = event.currentTarget;
        if (template.find('#csv-file').files.length > 0) {
            swal({
                    title: "Are you sure?",
                    text: "Your mapping is loss.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true
                },
                function(isConfirm) {
                    if (isConfirm) {

                        var _href = $(currentEl).attr('href').split('#')[1];
                        let ft = template.filetypes.get(); // all file type
                        let activeFiletypeId = _.indexOf(ft, _.find(ft, function(d) { return d.isActive }));
                        let newFiletypeId = _.indexOf(ft, _.find(ft, function(d) { return d.id == _href }));

                        ft[activeFiletypeId].isActive = false;
                        ft[newFiletypeId].isActive = true;
                        template.filetypes.set(ft);
                        template.abortData.set(true);
                        resetAll(template);
                        Router.go('/upload/' + _href);

                    }
                });
        } else {
            var _href = $(currentEl).attr('href').split('#')[1];
            let ft = template.filetypes.get(); // all file type
            let activeFiletypeId = _.indexOf(ft, _.find(ft, function(d) { return d.isActive }));
            let newFiletypeId = _.indexOf(ft, _.find(ft, function(d) { return d.id == _href }));

            ft[activeFiletypeId].isActive = false;
            ft[newFiletypeId].isActive = true;
            template.filetypes.set(ft);
            template.abortData.set(true);
            resetAll(template);
            Router.go('/upload/' + _href);
        }
        return
    },
    "click .remove-custom-javascript": function(event, template) {
        var currentEl = event.currentTarget;
        $(currentEl).closest('td').removeClass('has-edit').find('[data-target="#javascripEditorModal"]').attr('data-code', '');
        $(currentEl).closest('td').find('.transform-function').text('').attr('title', '');
        $(template.find('#preview')).find('.spinner').show();
        // generate Preview
        generatePreview(template.find('#csv-file').files[0], template, function() {
            let ft = template.filetypes.get(); // all file type
            let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
            insertCSVMapping(activeFiletypeId, template, function(e, res) {
                $(template.find('#preview')).find('.spinner').hide();
            });
        });
    },
    "click #btnSaveCustomjavascript": function(event, template) {
        var code = editor.getValue();
        let $selectedDom = $(template.find("a[data-target='#javascripEditorModal'].open"));
        let selectedheader = $selectedDom.attr('data-header');
        $selectedDom.attr('data-code', code).removeClass('open');
        if (code.trim() != '') {
            $selectedDom.attr('title', 'Edit').parent('td').addClass('has-edit').children('.transform-function').text(code).attr('title', code);
        } else {
            $selectedDom.attr('title', 'Edit').parent('td').removeClass('has-edit').children('.transform-function').text(code).attr('title', code);
        }
        $('#javascripEditorModal').modal('hide');

        $(template.find('#preview')).find('.spinner').show();
        // generate Preview
        generatePreview(template.find('#csv-file').files[0], template, function() {
            let ft = template.filetypes.get(); // all file type
            let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
            insertCSVMapping(activeFiletypeId, template, function(e, res) {
                $(template.find('#preview')).find('.spinner').hide();
            });
        });
    },
    "click a[data-target='#javascripEditorModal']": function(event, template) {
        var currentEl = event.currentTarget;
        $(currentEl).addClass('open');
        setTimeout(function() {
            if (editor == undefined) {
                editor = CodeMirror.fromTextArea(template.find("#customJavascript"), {
                    //placeholder: 'return row[' + $(currentEl).attr('data-header') + ']',
                    lineNumbers: true,
                    mode: "javascript" // set any of supported language modes here
                });
            }
            //editor.setValue();
            let _val = $(currentEl).attr('data-code').toString();
            if (_val != '') {
                editor.setValue(_val);
            } else {
                editor.setValue('return row["' + $(currentEl).attr('data-header') + '"];');
            }
            editor.refresh();
        }, 200);
    },
    "change #csv-file": function(event, template) {
        // Display an error toast, with a title

        let _files = [];
        abortChecked = false;

        for (let i = 0; i < template.find('#csv-file').files.length; i++) {
            let regex = new RegExp("(.*?)\.(csv)$");
            if ((regex.test(template.find('#csv-file').files[i].name))) {
                // view file progress
                let existFiles = template.files.get();
                existFiles.splice(0, 0, { name: template.find('#csv-file').files[i].name, progress: 0, mapping: true });
                template.files.set(existFiles);

                _files.push(template.find('#csv-file').files[i]);
            }
        }
        Papa.LocalChunkSize = 1000000; // 1000kb
        for (let i = 0; i < _files.length; i++) {

            $(template.find("#upload-csv-zone")).addClass('onprogress');

            //template.find("#mapping").style.display = 'block';
            setMapping(template, function() {
                getHeader(_files[i], template, function() {
                    generateXEditor(template, function() { // generate x-editor
                        //$(template.find("#mapping")).find('.spinner').hide();
                        $(template.find("#upload-csv-zone")).hide();
                        $(template.find("#mapping")).show();
                        $(template.find("#upload-csv-zone")).removeClass('onprogress');

                        // generate Preview
                        generatePreview(template.find('#csv-file').files[0], template, function() {
                            //template.find("#mapping").style.display = 'none';
                            $(template.find("#preview")).show();

                        });
                    });
                });
            });
            //parseCSV(_files[i], template); // parse csv to json using papa parse
        }
    },
    "change #hasheader": function(event, template) {
        $(template.find('#mapping')).find('.spinner').show();
        getHeader(template.find('#csv-file').files[0], template, function() {
            generateXEditor(template, function() { // generate x-editor
                $(template.find('#mapping')).find('.spinner').hide();
                $(template.find('#preview')).find('.spinner').show();
                setTimeout(function() {
                    // generate Preview
                    generatePreview(template.find('#csv-file').files[0], template, function() {
                        $(template.find('#preview')).find('.spinner').hide();
                    });
                }, 1000);
            });
        });
    },
    'click #btnNext': function(event, template) {

        $(template.find('#btnNext')).addClass('inProgress');

        $(template.find('#mapping')).hide();
        //$(template.find('#btnAbort')).show();
        //let mapping = generateMapping(template); // generate new Mapping

        // insert csv maaping in db

        let ft = template.filetypes.get(); // all file type
        let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
        insertCSVMapping(activeFiletypeId, template, function(e, res) {
            // upload csv file in db
            parseCSV(template.find('#csv-file').files[0], template, function() {

            });
        });
    },
    'click #btnAbort': function(event, template) {
        swal({
                title: "Abort?",
                text: "Are you sure you want to abort?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    abortChecked = true;
                    resetAll(template);
                }
            });
    },
    'click #addNewHeader': function(event, template) {

        //$(".view-mapping").scrollTop($(".view-mapping")[0].scrollHeight);

        $(template.find('#mapping')).find('.spinner').show();
        let oldHeaders = template.csvHeaders.get();

        oldHeaders.push('header_' + oldHeaders.length);
        template.csvHeaders.set(oldHeaders);
        //generateMapping(template);
        let _hasHeader = $(template.find('#hasheader')).prop('checked');

        let csvHeaders = template.csvHeaders.get();


        let existMapping; //Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: activeFiletype.id });

        if (_hasHeader) {
            existMapping = template.mappingWithHeader.get();

            existMapping.push({
                sysHeader: undefined,
                csvHeader: 'header_' + oldHeaders.length,
                transform: "",
                csvSysHeaderDetail: undefined
            });

            template.mappingWithHeader.set(existMapping);
        } else {
            existMapping = template.mappingWithOutHeader.get();
            existMapping.push({
                sysHeader: undefined,
                csvHeader: 'header_' + oldHeaders.length,
                transform: "",
                csvSysHeaderDetail: undefined
            });
            template.mappingWithOutHeader.set(existMapping);
        }
        template.csvHeaders.set(csvHeaders);

        generateXEditor(template, function() {
            $(template.find('#mapping')).find('.spinner').hide();
            $(".view-mapping").scrollTop($(".view-mapping")[0].scrollHeight);
            $(template.find('#preview')).find('.spinner').show();
            setTimeout(function() {
                // generate Preview
                generatePreview(template.find('#csv-file').files[0], template, function() {
                    $(template.find('#preview')).find('.spinner').hide();
                });
            }, 2000);
        });
    },
    'click #btnUploadImage': function(event, template) {
        $(template.find('#uploadCsv')).hide();
        $(template.find('#uploadImage')).show();
    },
    'click #btnUploadCsv': function(event, template) {
        $(template.find('#uploadCsv')).show();
        $(template.find('#uploadImage')).hide();
    }
});

let setMapping = function(template, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');

    let ft = Template.instance().filetypes.get(); // all file type
    let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
    // let csvmapping = Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: activeFiletype.id, hasHeader: _hasHeader });
    // if (csvmapping != undefined) {
    //     if (_hasHeader) {
    //         if (template.mappingWithHeader.get().length == 0) {
    //             template.mappingWithHeader.set(csvmapping.mapping);
    //         }
    //     } else {
    //         if (template.mappingWithOutHeader.get().length == 0) {
    //             template.mappingWithOutHeader.set(csvmapping.mapping);
    //         }
    //     }
    // }
    cb();
}

let generateMapping = function(template) {
    // get new mapping
    let mapping = [];
    let csvHeaders = template.csvHeaders.get();

    let activefile = getActiveHeaders(template); // get active file type data

    // create mapping
    csvHeaders.forEach(function(result, index) {
        mapping.push({
            sysHeader: $(template.find('#dpdsysheader_' + index)).editable('getValue')['dpdsysheader_' + index],
            csvHeader: $(template.find('#dpdcsvheader_' + index)).editable('getValue')['dpdcsvheader_' + index], //$(template.find('#dpdcsvheader_' + index)).text(),
            transform: $(template.find('#txtCustomJavascript_' + index)).attr('data-code'),
            csvSysHeaderDetail: _.find(activefile, function(d) { return d.text == $(template.find('#dpdsysheader_' + index)).text() })
        })
    });
    template.mapping.set(mapping);
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    if (_hasHeader) {
        template.mappingWithHeader.set(mapping);
    } else {
        template.mappingWithOutHeader.set(mapping);
    }
    return mapping;
}

let generateXEditor = function(template, cb) {
    let activefile = _.map(getActiveHeaders(template), function(d) { return d.text }); // get active file type data

    let _csvHeader = template.csvHeaders.get();
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    // create mapping
    let ft = template.filetypes.get(); // all file type
    let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
    let existMapping; //Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: activeFiletype.id });

    if (_hasHeader) {
        existMapping = template.mappingWithHeader.get();
    } else {
        existMapping = template.mappingWithOutHeader.get();
    }

    setTimeout(function() {
        _csvHeader.forEach(function(result, index) {
            //let _val;
            // if (_hasHeader) {
            //     _val = getHeaderDistance(result, activefile);
            // } else {
            //     _val = activefile[index]
            // }
            $(template.find('#dpdcsvheader_' + index)).editable("destroy");
            $(template.find('#dpdcsvheader_' + index)).editable({
                validate: function(value) {
                    if ($.trim(value) == '') {
                        return 'This field is required';
                    }
                    if (_.chain(existMapping).map(function(d) { return d.csvHeader }).contains(value).value()) {
                        return 'Already exist,Please try some one else.'
                    }
                },
                success: function(response, newValue) {
                    $(template.find('#preview')).find('.spinner').show();
                    setTimeout(function() {
                        generatePreview(template.find('#csv-file').files[0], template, function() {
                            $(template.find('#preview')).find('.spinner').hide();
                        });
                    }, 1000);
                }
            });

            $(template.find('#dpdsysheader_' + index)).editable("destroy");
            $(template.find('#dpdsysheader_' + index)).editable({
                //value: _val.toLowerCase(),
                emptytext: '--NA--',
                source: activefile,
                success: function(response, newValue) {
                    changeXEditorValue(template);
                }
            });
            if (existMapping.length > 0) {
                if (existMapping[index].sysHeader != undefined) {
                    $(template.find('#dpdsysheader_' + index)).editable('setValue', existMapping[index].sysHeader);
                }
            }
            // if (_val != undefined) {
            //     //$(template.find('#dpdsysheader_' + index)).editable('setValue', _val.toLowerCase());
            // }
            //activefile = _.without(activefile, _val);

            if (existMapping.length > 0) {
                if (existMapping[index].transform.trim() != '') {
                    let code = existMapping[index].transform;
                    $(template.find('#txtCustomJavascript_' + index)).attr('data-code', code).attr('title', 'Edit').parent('td').addClass('has-edit').children('.transform-function').text(code).attr('title', code);
                }
            }
        });
        reGenerateXEditor(template);
        cb();
    }, 1000);
}

let reGenerateXEditor = function(template) {
    let activefile = _.map(getActiveHeaders(template), function(d) { return d.text }); // get active file type data

    let _csvHeader = template.csvHeaders.get();
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    // create mapping

    let ft = template.filetypes.get(); // all file type
    let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype

    _csvHeader.forEach(function(result, index) {
        let oldValue = $(template.find('#dpdsysheader_' + index)).editable('getValue')['dpdsysheader_' + index];
        if (oldValue != undefined) {
            activefile = _.without(activefile, oldValue);
        }
    });

    _csvHeader.forEach(function(result, index) {
        let _oldvalue = $(template.find('#dpdsysheader_' + index)).editable('getValue')['dpdsysheader_' + index];
        $(template.find('#dpdsysheader_' + index)).editable("destroy");
        $(template.find('#dpdsysheader_' + index)).editable({
            value: _oldvalue,
            emptytext: '--NA--',
            source: activefile,
            success: function(response, newValue) {
                changeXEditorValue(template);
            }
        });
    });
}

let changeXEditorValue = function(template) {
    //console.log('success');
    $(template.find('#preview')).find('.spinner').show();
    setTimeout(function() {
        reGenerateXEditor(template);
        generatePreview(template.find('#csv-file').files[0], template, function() {
            $(template.find('#preview')).find('.spinner').hide();
        });
    }, (500));
}

let resetAll = function(template) {
    $(template.find('#csv-file')).val('');
    $(template.find("#mapping")).hide();
    $(template.find("#preview")).hide();
    $(template.find('#btnNext')).find('.progress-inner').css({ 'width': '0%' });
    $(template.find('#btnNext')).removeClass('inProgress');
    $(template.find("#upload-csv-zone")).show();
    $(template.find('#btnNext')).find('.content').text('Proceed');
    $(template.find('#btnNext')).show();
    //$(template.find('#btnAbort')).hide();
    $(template.find("#handson-Zone-during-upload")).hide();
    $(template.find('#uploadCsv')).show();
    $(template.find('#uploadImage')).hide();
    toastr.clear();

    // destroyXEditor

    //let activefile = template.headers.get(); // get active file type data
    //let _csvHeader = template.csvHeaders.get();
    //let _dataTypes = template.dataTypes.get();

    //console.log('dataTypes', _dataTypes);
    //console.log('csvHeader', _csvHeader);
    // create mapping
    //activefile.forEach(function(result, index) {
    //    let _val = getHeaderDistance(result.column, _csvHeader);
    //    $(template.find('#dpdcsvheader_' + index)).editable("destroy");
    //    //$(template.find('#dpddatatype_' + index)).editable("destroy");
    //});
}

let getHeaderDistance = function(sysColumn, csvHeaders) {
    let res = csvHeaders[0];
    // console.log(this.csvHeaders);
    let col = sysColumn;
    csvHeaders.forEach(function(d) {
        res = Levenshtein.get(col, d) < Levenshtein.get(col, res) ? d : res;
    });
    return res;
}

let insertCSVMapping = function(fileTypeID, template, cb) {

    let mapping = generateMapping(template); // generate new Mapping
    let _hasHeader = $(template.find('#hasheader')).prop('checked');

    let isExist = Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: fileTypeID, hasHeader: _hasHeader });
    if (isExist == undefined) {
        let _data = {
            mapping: mapping,
            fileTypeID: fileTypeID,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            hasHeader: _hasHeader,
            owner: Meteor.userId(),
            username: Meteor.user().username
        };
        Csvfilemapping.insert(_data, function(e, res) {
            cb(e, res);
        });
    } else {
        let _data = {
            mapping: mapping,
            updateAt: new Date()
        };
        Csvfilemapping.update(isExist._id, { $set: _data }, function(e, res) {
            cb(e, res);
        });
    }
}

// Return array of string values, or NULL if CSV string not well formed.
let CSVtoArray = function(text) {
    let p = '',
        row = [''],
        ret = [row],
        i = 0,
        r = 0,
        s = !0,
        l;
    for (l in text) {
        l = text[l];
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = ''];
            i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret.slice(0, ret.length - 1);
};

let arrayToCSV = function(row) {
    for (let i in row) {
        for (let j in row[i]) {
            row[i][j] = "\"" + row[i][j] + "\"";
        }
        row[i] = row[i].join(',');
    }
    return row.join('\n');
}

let getHeader = function(_file, template, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    Papa.parse(_file, {
        header: _hasHeader,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            let rows = CSVtoArray(chunk);
            let headings = rows[0]; //rows[0].map(v => v.toLowerCase());
            if (!_hasHeader) {
                let newHeaders = [];
                headings.forEach(function(result, index) {
                    newHeaders.push('header' + (index + 1));
                });
                template.csvHeaders.set(newHeaders);
            } else {
                template.csvHeaders.set(headings);
            }
        },
        complete: function(results) {
            //console.log('results', results);
        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            streamer.abort();
            cb();
        }
    });
};

let getTransformVal = function(headings, row, transformStr, oldValue, index) {
    try {
        let code = transformStr;
        _.each(headings, function(d, index) {
            row[d] = row[index];
        });
        row['_id'] = index;
        let result = new Function("row", code).call(this, row);
        return result;
    } catch (e) {
        return oldValue;
    }
}

let generateDatawithNewHeader = function(chunk, _hasHeader, mapping, isPreview, template) {
    let rows = CSVtoArray(chunk);
    let headings = template.csvHeaders.get(); //  _.extend([], rows[0]);

    let oldRows = CSVtoArray(chunk);
    let activeHeaders = getActiveHeaders(template).slice(1, -1);
    // let extraHeaders = _.reject(headings, function(d) { return _.indexOf(_.map(mapping, function(v) { return v.csvHeader }), d) != -1 })

    let newHeading = _.map(mapping, function(v) { return v.csvHeader });
    //console.log('activeHeaders', activeHeaders);
    _.each(mapping, function(d, inx) {
        for (let i = _hasHeader ? 1 : 0; i < oldRows.length; i++) {
            if (d.transform.trim() != '') {
                rows[i][inx] = getTransformVal(headings, oldRows[i], d.transform.trim(), oldRows[i][inx], i);
            } else {
                rows[i][inx] = oldRows[i][inx];
            }
            rows[i][inx] = (rows[i][inx] == undefined) ? '' : rows[i][inx];
        }
        let headerText = d.csvHeader.trim();
        if (!isPreview && d.sysHeader != undefined) {
            //let mapHeader = _.find(activeHeaders, function(v) { return v.text == d.sysHeader });
            headerText = (d.csvSysHeaderDetail != undefined) ? d.csvSysHeaderDetail.column.trim() : d.csvHeader.trim();
        } else {
            headerText = (d.sysHeader != undefined && d.sysHeader != '') ? d.sysHeader.trim() : d.csvHeader.trim();
        }
        if (_hasHeader) {
            rows[0][inx] = headerText; // (d.sysHeader != undefined) ? d.sysHeader.trim() : d.csvHeader.trim();
        } else {
            newHeading[inx] = headerText; // (d.sysHeader != undefined) ? d.sysHeader.trim() : d.csvHeader.trim();
        }
    });
    return (!_hasHeader ? (newHeading.join(',') + '\n') : "") + arrayToCSV(rows);
}

let generatePreview = function(_file, template, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    // generateMapping
    generateMapping(template);
    mapping = template.mapping.get();

    Papa.parse(_file, {
        header: true,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            return generateDatawithNewHeader(chunk, _hasHeader, mapping, true, template);
        },
        complete: function(results) {
            //console.log('results', results);

        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            template.previewRec.set(results.data.slice(0, 5));
            streamer.abort();
            cb();
            return;
        }
    });
};

let setNextFile = function(template, cb) {
    let ft = template.filetypes.get(); // all file type
    let activeFiletypeId = _.indexOf(ft, _.find(ft, function(d) { return d.isActive }));
    swal({
            title: "Upload successfully",
            text: "Are you ready to upload next file?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
        function(isConfirm) {
            if (isConfirm) {
                console.log(template);
                ft[activeFiletypeId].isActive = false;
                ft[activeFiletypeId].isDone = true;
                ft[activeFiletypeId + 1].isActive = true;
                template.filetypes.set(ft);
                template.abortData.set(true);
                resetAll(template);
                Router.go('/upload/' + ft[activeFiletypeId + 1].id);
                cb();
            } else {
                ft[activeFiletypeId].isActive = true;
                ft[activeFiletypeId].isDone = true;
                template.filetypes.set(ft);
                template.abortData.set(true);
                cb();
            }
        });
}

let parseCSV = function(_file, template, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    // generateMapping
    generateMapping(template);
    let mapping = template.mapping.get();

    $(template.find('#btnNext')).find('.progress-inner').css({ 'width': '0%' });
    $(template.find('#btnNext')).find('.content').text('Start uploding...');
    let file = {
        name: _file.name,
        size: _file.size,
        progress: 0,
        totalNoOfRecords: 0,
        uploadedRecords: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: '',
        owner: Meteor.userId(),
        username: Meteor.user().username
    };

    Csvfiles.insert(file, function(e, res) {
        $('#buttonProceedNext').hide();
        let fileID = res; // new file id
        let ft = template.filetypes.get(); // all file type
        let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
        //console.log('fileID', fileID);
        let chunks = 1;
        let totalRecords = 0;
        let uploadedRecords = 0;
        let progress = 0;
        Papa.parse(_file, {
            header: true,
            dynamicTyping: true,
            encoding: "UTF-8",
            skipEmptyLines: true,
            complete: function(results) {
                if (!abortChecked && progress == 100) {
                    updateJobMaster(activeFiletype.id, fileID, function() {
                        setNextFile(template, function() {
                            cb();
                        });
                    });
                }
            },
            error: function(error, f) {
                console.log("ERROR:", error, f);
            },
            step: function(results, parser) {
                //console.log("Row:", results);
                if (abortChecked) {
                    parser.abort();
                    return;
                }
                parser.pause();

                insertCSVData(results.data[0], fileID, activeFiletype.collection, function() {

                    //$("#errMessageFromSchema").text('');
                    toastr.clear();

                    // calculate progress
                    ++uploadedRecords;
                    let newProgress = Math.round((uploadedRecords * 100) / totalRecords);
                    if (progress == newProgress) {
                        parser.resume();
                    } else {
                        $(template.find('#btnNext')).find('.progress-inner').css({ 'width': newProgress + '%' })
                        $(template.find('#btnNext')).find('.content').text(newProgress + '% completed');

                        $(template.find('#buttonProceedNext')).find('.progress-inner').css({ 'width': newProgress + '%' })
                        $(template.find('#buttonProceedNext')).find('.content').text(newProgress + '% completed');
                        Csvfiles.update(fileID, { $set: { progress: newProgress, uploadedRecords: uploadedRecords } }, function(e, res) {
                            console.log('csvupload');
                            parser.resume();
                        });
                    }
                    progress = newProgress;
                });
            },
            beforeFirstChunk: function(chunk) {
                let rows = CSVtoArray(chunk);
                console.log('rows.length', rows.length);
                totalRecords = (_hasHeader) ? rows.length - 1 : rows.length - 0; // last row getting empty
                Csvfiles.update(fileID, { $set: { totalNoOfRecords: totalRecords } }, function(e, res) {});
                return generateDatawithNewHeader(chunk, _hasHeader, mapping, false, template);
            },
            // chunk: function(results, streamer) {

            //     if (!results)
            //         return;

            //     //console.log('finished', streamer.streamer._finished);
            //     //console.log('streamer', streamer.streamer);

            //     // calculate progress
            //     let progress = Math.round((streamer.streamer._config.chunkSize * chunks) / streamer.streamer._input.size * 100);
            //     progress = progress > 100 ? 100 : progress;
            //     let noOfRecords = streamer.streamer._rowCount;

            //     // insert chunk data in mongo db
            //     streamer.pause();
            //     //Meteor.call('products.insertCSVData', fileID, results.data, function() {
            //     insertCSVData(fileID, results.data, template, progress, streamer, function() {
            //         // update file progress
            //         Csvfiles.update(fileID, {
            //                 $set: { progress, noOfRecords }
            //             },
            //             function(e, res) {
            //                 if (progress < 100) {
            //                     //streamer.resume();
            //                 } else {
            //                     streamer.abort();
            //                     cb(); // callback 'parseCSV' method
            //                 }
            //             });
            //     });
            //     //console.log("Chunk data:", results.data.length, results);

            //     // update progress

            //     // let existFiles = template.files.get();
            //     // for (let i = 0; i < existFiles.length; i++) {
            //     //     if (existFiles[i].name == streamer.streamer._input.name)
            //     //         existFiles[i].progress = progress;
            //     // }
            //     // template.files.set(existFiles);
            //     //$(template.find('#btnNext')).find('.progress-inner').css({ 'width': progress + '%' })
            //     //$(template.find('#btnNext')).find('.content').text(progress + '% completed');
            //     //console.log('progress', progress);
            //     chunks++;
            // }
        });
    });
}

let getActiveHeaders = function(template) {
    let ft = template.filetypes.get(); // all file type
    let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
    activeFiletype.header.unshift("--NA--");
    return _.uniq(activeFiletype.header);
}

Template.readCSV.onCreated(function() {
    //console.log(Router.current().params.id);
    //console.log(this);
    // if (this.data == undefined) {
    //     Router.go('/');
    // }
    //console.log(Meteor.userId());
    //let masterJob = this.data;

    let masterJob = CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running' });
    let a =
        toastr.options = {
            "closeButton": true,
            // "showMethod": "show",
            // "hideDuration": "1000",
            // "showDuration": "0",
            // "timeOut": "10000000"
        }
    this.files = new ReactiveVar([]);
    this.csvHeaders = new ReactiveVar([]);
    this.headers = new ReactiveVar([]);
    this.previewRec = new ReactiveVar([]);
    this.filetypes = new ReactiveVar(
        [
            { id: 'ProductInformation', name: 'Product Information', isDone: masterJob.hasOwnProperty('ProductInformation') ? true : false, isActive: false, header: ProductInformationHeaders, collection: CollProductInformation, require: true },
            { id: 'ProductPrice', name: 'Product Pricing', isDone: masterJob.hasOwnProperty('ProductPrice') ? true : false, isActive: false, header: ProductPriceHeaders, collection: CollProductPrice, require: false },
            { id: 'ProductImprintData', name: 'Imprint Data', isDone: masterJob.hasOwnProperty('ProductImprintData') ? true : false, isActive: false, header: ProductImprintDataHeaders, collection: CollProductImprintData, require: false },
            { id: 'ProductImage', name: 'Image', isDone: masterJob.hasOwnProperty('ProductImage') ? true : false, isActive: false, header: ProductImageHeaders, collection: CollProductImage, require: false },
            { id: 'ProductShipping', name: 'Shipping', isDone: masterJob.hasOwnProperty('ProductShipping') ? true : false, isActive: false, header: ProductShippingHeaders, collection: CollProductShipping, require: false },
            { id: 'ProductAdditionalCharges', name: 'Additional Charges', isDone: masterJob.hasOwnProperty('ProductAdditionalCharges') ? true : false, isActive: false, header: ProductAdditionalChargeHeaders, collection: CollProductAdditionalCharges, require: false },
            { id: 'ProductVariationPrice', name: 'Variation Price', isDone: masterJob.hasOwnProperty('ProductVariationPrice') ? true : false, isActive: false, header: ProductVariationPricingHeaders, collection: CollProductVariationPrice, require: false }
        ]
    );
    this.mapping = new ReactiveVar([]);
    this.mappingWithOutHeader = new ReactiveVar([]);
    this.mappingWithHeader = new ReactiveVar([]);
    this.abortData = new ReactiveVar(true);

    let ft = Template.instance().filetypes.get();

    let pendingFiles = _.find(ft, function(d) { return !masterJob.hasOwnProperty(d.id) });
    if (pendingFiles != undefined) {
        ft[_.indexOf(ft, pendingFiles)].isActive = true;
        Router.go('/upload/' + pendingFiles.id);
    } else {
        ft[0].isActive = true;
        Router.go('/upload/' + ft[0].id);
    }

    Template.instance().filetypes.set(ft);
});


Template.readCSV.helpers({
    abortData() { return Template.instance().abortData.get() },
    files() {
        return Template.instance().files.get();
    },
    headers() {
        let ft = Template.instance().filetypes.get(); // all file type
        let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
        //console.log('activeFiletype', activeFiletype);
        //console.log(activeFiletype.header);
        Template.instance().headers.set(activeFiletype.header);
        return Template.instance().headers.get();
    },
    csvHeaders() {
        return Template.instance().csvHeaders.get();
    },
    // distance() {
    //     let res = this.csvHeaders[0];
    //     // console.log(this.csvHeaders);
    //     let col = this.col;
    //     this.csvHeaders.forEach(function(d) {
    //         res = Levenshtein.get(col, d) < Levenshtein.get(col, res) ? d : res;
    //     });
    //     return res;
    // },
    previewRec() {
        return Template.instance().previewRec.get();
    },
    filetypes() {
        return Template.instance().filetypes.get();
    },
    mapping() {
        return Template.instance().mapping.get();
    },
    mappingWithOutHeader() {
        return Template.instance().mappingWithOutHeader.get();
    },
    mappingWithHeader() {
        return Template.instance().mappingWithHeader.get();
    },
    getJsonValues(obj) {
        return Object.values(obj);
    },
    getJsonKeys(obj) {
        return Object.keys(obj);
    },
    previewCollection() {

        let ft = Template.instance().filetypes.get(); // all file type
        let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
        let obj = CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running' });
        if (obj != undefined && activeFiletype != undefined) {
            if (obj.hasOwnProperty(activeFiletype.id)) {
                return activeFiletype.collection.find({ fileID: obj[activeFiletype.id].id }, { fields: { 'everythingButThisField': 0 } }).fetch();
            }
        }
        return [];
    },
    isActiveStep2() {
        let obj = CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running' });
        let ft = Template.instance().filetypes.get();

        return !_.chain(ft).filter(function(d) { return d.require }).map(function(d) { return d.id }).map(function(d) { return _.contains(_.keys(obj), d) }).contains(false).value();
    },
    isImagesTab() {
        return Router.current().params.id == "ProductImage";
    }
});

let updateJobMaster = function(filename, fileID, cb) {
    //return CollUploadJobMaster.findOne({ owner: Meteor.userId(),deleteAt:'',stepStatus:1 });
    let data = {};
    data[filename] = { id: fileID, validateStatus: 'pending', uploadStatus: 'completed', uplodedAt: new Date() };
    let Obj = CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running', stepStatus: 'upload_pending' });
    CollUploadJobMaster.upsert(Obj._id, { $set: data }, function() {
        cb();
    });
}

let insertCSVData = function(data, fileID, collection, cb) {
    let copedata = $.extend({}, data);
    data['fileID'] = fileID;
    data['owner'] = Meteor.userId();
    data['username'] = Meteor.user().username;
    // console.log('data', data);
    // return;
    collection.insert(data, function(err, res) {
        if (err) {
            //console.log('errmessage', err.message);
            //console.log('err', err.invalidKeys);
            //console.log('data', data);
            $("#upload-csv-zone,#preview").hide();
            $("#handson-Zone-during-upload").show();

            $('#buttonProceedNext').show().find('.content').text('Proceed To Next');
            $('#btnNext').hide();
            //toastr.error(err.message);
            $("#errMessageFromSchema").text(err.message);

            renderHandsonTable(copedata, Object.keys(copedata), 'hotErrorDataDuringUpload', err, fileID, collection, cb);
        } else {
            cb(); // callback
        }
    });
}
let errorRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.border = "2px solid #a94442";
};

let getHandsonHeader = function(headers, invalidKeys) {
    let newHeaders = [];
    _.each(headers, function(val, inx) {
        if (_.find(invalidKeys, function(d) { return d.name == val; }) != undefined) {
            newHeaders.push({ colHeader: val, renderer: errorRenderer, data: val })
        } else {
            newHeaders.push({ colHeader: val, data: val })
        }
    });
    return newHeaders;
}

let renderHandsonTable = function(dataObject, headers, eleName, error, fileID, collection, cb) {
    //Csvfiles.update(fileID, {$set: { 'errorString' :  error }});
    //  console.log(headers);
    //console.log('error', error.invalidKeys);
    //console.log('headers', headers);
    let newHeaders = getHandsonHeader(headers, error.invalidKeys);
    //console.log('newHeaders', newHeaders);
    let hotSettings = {
        data: dataObject,
        columns: newHeaders,
        stretchH: 'all',
        autoWrapRow: true,
        //height: 441,
        //maxRows: 22,
        rowHeaders: true,
        //colHeaders: getHeadersValues(headers),
        colHeaders: headers,
        afterChange: function(changes, source) {
            //updateErrorData(changes, source, dataObject, fileID);
            $("#buttonProceedNext").unbind('click').click(function() {
                console.log('afterchange', dataObject);
                insertCSVData(dataObject, fileID, collection, cb);
            });
        }
    };
    hotElement = document.querySelector('#' + eleName);

    objHandsontable = new Handsontable(hotElement, hotSettings);
}

Template.EditorPage.helpers({
    "editorOptions": function() {
        return {
            lineNumbers: true,
            mode: "javascript"
        }
    },

    "editorCode": function() {
        return "function(row){\n return row; \n};\n";
    }
});
