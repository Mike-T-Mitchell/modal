var modal = (function(){
    // methods will accept parameters/attributes as key:value pairs in an object
    var method = {};
    var $bgOverlay; // semi-opaque background
    var $modal;     // modal window itself
    var $content;   // content within the modal window
    var $close;     // close button

    // Center modal on screen
    method.center = function () {
        var top;
        var left;

        // subtract 'distance from the top of modal window to the top of screen' from 'the total window height' and return
        // that OR 0 (whichever is bigger), and divide the returned value by 2. Finally, store that value in variable 'top.'
        $(window).on('load', function() {
            top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2; // sample distance to top of screen to ensure we stay equidistant on resize
            left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;  // sample distance to left side of screen to ensure we stay equidistant on resize


        // add the scrollTop and scrollTeft values to the values we found above and apply the sum of each as top and left attributes to the css
            $modal.css({
                top: top + $(window).scrollTop(),
                left: left + $(window).scrollLeft()
            });
        });
    };

    // Open the modal
    method.open = function (settings) {
        $content.empty().append(settings.content);

        // apply css to modal object
        $modal.css({
            width: settings.width || 'auto', 
            height: settings.height || 'auto'
        });

        // center the opened modal
        method.center();
        
        // bind the resize and center events to window
        $(window).on('resize.modal', method.center); // .on is same as .bind()
        
        // show the modal
        $modal.show();
        
        // show the semi-opaque bg
        $bgOverlay.show();
    };


    // Close the modal

    method.close = function () {
        
        // hide the modal window, semi-opaque background, empty content, and unbind the resize event from the window (which we no longer need)
        $modal.hide();
        $bgOverlay.hide();
        $content.empty();
        $(window).off('resize.modal'); // .off() is same as .unbind()
    };

    // Generate our HTML and use jQuery to add it to the document
    $bgOverlay = $('<div id="bgOverlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#">close</a>');

    $modal.hide();
    $bgOverlay.hide();
    
    // makes the div w/ ID 'content' and anchor w/ ID 'close' children of the modal window div element
    $modal.append($content, $close);

    
    // on document ready, append our semi-opaque background and modal window (which contains our content and close children) to the body element
    $(function() {
        $('body').append($bgOverlay, $modal);
    });

    // bind the close button to a click event
    $close.on('click', function(e){
        e.preventDefault();
        method.close();
    });

    return method;

}());

// inject product data into modal window via XHR request
$(function() {

    var result = $.get('//staging-us.freepeople.com/modal-test-xhr/', function(data){
        modal.open({content: data});
        return this;
    });

    $('#modalOpen').click(function(e){
        e.preventDefault();

        $.get('//staging-us.freepeople.com/modal-test-xhr/', function(data){
            modal.open({content: data});
        });

    });

});