(function(window){
'use strict';

// CONSTRUCTOR -- makes our variables available
// to our methods and executes the init method

var InternalModal = function() {
    this.$bgOverlay = $('<div id="bgOverlay"></div>');      // semi-opaque background
    this.$modal = $('<div id="modal"></div>');              // modal window itself
    this.$content = $('<div id="content"></div>');          // content within the modal window
    this.$close = $('<a id="close" href="#">close</a>');     // close button
    this.$window = $(window);

    this.init();
    this._bindEvents();

};

var IMProto = InternalModal.prototype;

IMProto.init = function(){
    this.$modal.append(this.$content, this.$close);
    $('body').append(this.$bgOverlay, this.$modal);
};

IMProto.positionCenter = function(){
    var top = Math.max(this.$window.height() - this.$modal.outerHeight(), 0) / 2; // sample distance to top of screen to ensure we stay equidistant on resize
    var left = Math.max(this.$window.width() - this.$modal.outerWidth(), 0) / 2;  // sample distance to left side of screen to ensure we stay equidistant on resize

    // add the scrollTop and scrollLeft values to the values we found above and apply the sum of each as top and left attributes to the css
    this.$modal.css({
        top: top + this.$window.scrollTop(),
        left: left + this.$window.scrollLeft()
    });
};

IMProto.openModal = function(settings){

    // if no settings passed, exit
    if ((!settings)) {
        return;
    }

    this.$modal.css({
        width: settings.width || '500px',
        height: settings.height || '500px'
    });

    // center the opened modal
    this.positionCenter();

    // show the modal
    this.$modal.show();

    // show the semi-opaque bg
    this.$bgOverlay.show();

    this.$content.append(settings.content);
};

IMProto.closeModal = function(){
    this.$modal.hide();
    this.$bgOverlay.hide();
    this.$content.empty();
    this._destroyModal();
};

IMProto._bindEvents = function(){
    this.$window.on('resize.modal', this.positionCenter.bind(this));
    this.$window.on('load', this.positionCenter.bind(this));
    this.$close.on('click', this.closeModal.bind(this));
};

IMProto._destroyModal = function(){
    this.$window.off('resize.modal', this.positionCenter.bind(this));
};

var SimpleModal = function(){
    var modal = new InternalModal();
    this.init = modal.init.bind(modal);
    this.positionCenter = modal.positionCenter.bind(modal);
    this.openModal = modal.openModal.bind(modal);
    this.closeModal = modal.closeModal.bind(modal);
};

window.SimpleModal = SimpleModal;
}(window));