function ReportManager() {
  this.messageID = '';
  this.messageGuid = '';
  this.cashflowGuid = '';
  this.pxid = '';

  this.init = function () {
    this.openCloseListener();
  }

  this.openCloseListener = function () {
    $('body').on('click', '.openclose', function () {
      var elem = $(this).parent();
      var base = 'document';

      if (elem.hasClass('block')) base = 'block';

      if (elem.hasClass(base + '_closed')) {
        elem.removeClass(base + '_closed');
        if (typeof elem.attr('_onclick') !== 'undefined')
          eval("_manager." + elem.attr('_onclick'))();
      }
      else
        elem.addClass(base + '_closed');
    });
  }

  // SUMMARY: database shared ajax call
  this.call = function (url, data, succ_func) {
    _system.ajax('/database/' + url, data, 'POST', function (response) {
      if (typeof succ_func === 'function') succ_func(response);
    });
  }

  this.init();
}