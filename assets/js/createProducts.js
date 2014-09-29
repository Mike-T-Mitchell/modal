/*
 * INJECT PRODUCTS INTO MODAL --
 *
 * After we get the JSON data, create & apply product data to
 * the client-side template by looping through the JSON file
 */

// get products and display them in modal
function item_data(category, navigation) {
    var promise;
    // check domain
    if (fpDomain.indexOf('uk') >= 0) {
        siteId = 3;
        translationId = 'B2A4F921-DBFA-414C-8EF9-0B587E496897';
    } else if (fpDomain.indexOf('cn') >= 0) {
        siteId = 4;
        translationId = '65785B51-1D48-4D97-862B-735290AB81CA';
    }
    $('.modalProducts ul').animate({opacity: 0}, function () {

        $('.items_loading').animate({opacity: 1}, 250);

        if (category === '') {
            promise = WEBLINC.getProductsByCategory({siteID: siteId, translationID: translationId, navigationItemID: navigation});
        } else if (navigation === '') {
            promise = WEBLINC.getProductsByCategory({siteID: siteId, translationID: translationId, categoryID: category});
        } else {
            promise = WEBLINC.getProductsByCategory({siteID: siteId, translationID: translationId, navigationItemID: navigation, categoryID: category});
        }

        promise.success(function (jsonResponse) {
            $('.ebook_items ul').html('');

            $('.items_loading').animate({opacity: 0}, 250, function () {
                $('.ebook_items ul').animate({opacity: 1}, 500);
            });

            var
                template = $('#ebookItems').html(),
                parse_info = $.parseJSON(JSON.stringify(jsonResponse));

            $.each(parse_info.DATA, function(i, elem) {
                var
                    image_attr,
                    image_suffix,
                    renderedTemplate,
                    itemData = {};

                if (elem[4] !== null) {
                    image_attr = elem[4].split('_');
                    image_suffix = image_attr[2].replace('$browse$', '$browse-lt$');
                } else {
                    image_attr = [];
                    image_attr[1] = '';
                    image_attr[2] = '';
                    image_suffix = '';
                }


                itemData = {
                    id: elem[0],
                    symbol: elem[1],
                    code: elem[2],
                    name: elem[3],
                    image: elem[4],
                    alias: elem[5],
                    style: elem[6],
                    color: elem[7],
                    org_price: formatPrice(elem[8]),
                    cur_price: formatPrice(elem[9]),
                    sale_price: formatPrice(elem[10]),
                    order: elem[11],
                    count: parse_info.DATA.length,
                    imgAttr1: image_attr[1],
                    imgAttr2: image_suffix
                };

                renderedTemplate = _.template(template, { itemData: itemData });
                $('.ebook_items ul').append(renderedTemplate);
            });

            // initialize quickview
            WEBLINC.widgets.init($('.ebook_items'));
        });

        $('.ebook_slider_prev_action, .ebook_slider_next_action').click(function () {
            promise.abort();
        });

    });
}
/* END PRODUCT DISPLAY */