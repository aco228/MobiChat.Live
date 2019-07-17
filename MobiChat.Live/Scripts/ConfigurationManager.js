function DatabaseConfigurationManager() {
  this.elem = null;
  this.displayed = false;

  this._limit = '';
  this._from = '';
  this._to = '';
  this._country = '';
  this._mobileOperator = '';
  this._service = '';
  this._msisdn = '';
  this._pxid = '';
  this._messageDirection = '';
  this._messageStatus = '';
  this._messageType = '';
  this._refreshTime = 30;
  this._refreshEnabled = 1;

  this.init = function () {
    var self = this;

    this.updateOperators();
    $('#config_country').focusout(function () { self.updateOperators(); });

    this.elem = $('#config');
    this.collect();
    this.dateManipulation();
    this.inputChanged();
    this.inputDelete();
    this.selectDynamicShowHide();
  }

  // SUMMARY: Date manipulation based on click in configuration menu
  this.dateManipulation = function () {
    var self = this;
    $('.dateManipulate').click(function () {
      var startDate = new Date(); startDate.setHours(0, 0, 0, 0);
      var endDate = new Date(); endDate.setHours(0, 0, 0, 0);

      var value = $(this).attr('value');

      if (value == "today")
        endDate.setDate(endDate.getDate() + 1);
      else if (value == 'week') {
        startDate.setDate(startDate.getDate() - startDate.getDay());
        endDate.setDate(startDate.getDate() + 7);
      }
      else if (value == 'month') {
        startDate.setDate(1);
        endDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1);
      }
      else if (value == 'year') {
        startDate.setMonth(1);
        endDate.setMonth(1);
        startDate.setDate(1);
        endDate.setDate(1);
        endDate.setYear(endDate.getFullYear() + 1);
      }
      else if (value == 'dayBefore') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setDate(startDate.getDate() - 1);
        //endDate = startDate;
        endDate.setDate(startDate.getDate() + 1);
      }
      else if (value == 'dayAfter') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(startDate.getDate() + 1);
      }
      else if (value == 'weekBefore') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setDate(startDate.getDate() - startDate.getDay() - 7);
        endDate.setDate(startDate.getDate() + 7);
      }
      else if (value == 'weekAfter') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setDate(startDate.getDate() - startDate.getDay() + 7);
        endDate.setDate(startDate.getDate() + 7);
      }
      else if (value == 'monthBefore') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setDate(1);
        startDate.setMonth(startDate.getMonth() - 1);
        endDate.setMonth(startDate.getMonth() + 1);
      }
      else if (value == 'monthAfter') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setDate(1);
        startDate.setMonth(startDate.getMonth() + 1);
        endDate.setMonth(startDate.getMonth() + 1);
      }
      else if (value = 'yearBefore') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setMonth(1);
        startDate.setYear(startDate.getFullYear() - 1);
        endDate.setYear(startDate.getFullYear() + 1);
      }
      else if (value = 'yearAfter') {
        startDate = self.getDateFromString($('#config_from').val());
        endDate = self.getDateFromString($('#config_from').val());

        startDate.setMonth(1);
        startDate.setYear(startDate.getFullYear() + 1);
        endDate.setYear(startDate.getFullYear() + 1);
      }

      return self.setManipulatedDate(startDate, endDate);
    });
  }

  // SUMMARY: set date on configration pannel
  this.setManipulatedDate = function (startDate, endDate) {
    var startDateString = this.frontZero(startDate.getFullYear()) + "-" + this.frontZero((startDate.getMonth() + 1)) + "-" + this.frontZero(startDate.getDate()) + " " + this.frontZero(startDate.getHours()) + ":" + this.frontZero(startDate.getMinutes()) + ":" + this.frontZero(startDate.getSeconds());
    var endDateString = this.frontZero(endDate.getFullYear()) + "-" + this.frontZero((endDate.getMonth() + 1)) + "-" + this.frontZero(endDate.getDate()) + " " + this.frontZero(endDate.getHours()) + ":" + this.frontZero(endDate.getMinutes()) + ":" + this.frontZero(endDate.getSeconds());

    $('#config_from').val(startDateString);
    $('#config_to').val(endDateString);
  }

  // SUMMARY: Convert to Date from configuration date string
  this.getDateFromString = function (string) {
    //2016-03-14 00:00:00

    var parts = string.split(' ');
    if (parts.length != 2)
      return null;

    var first = parts[0].split('-');
    if (first.length != 3)
      return null;

    var second = parts[1].split(':');
    if (second.length != 3)
      return null;

    var referenceDate = new Date();
    var year = this.isNumeric(first[0]) ? parseInt(first[0]) : referenceDate.getFullYear();
    var month = this.isNumeric(first[1]) ? parseInt(first[1]) - 1 : referenceDate.getMonth();
    var day = this.isNumeric(first[2]) ? parseInt(first[2]) : referenceDate.getDate();

    var hour = this.isNumeric(second[0]) ? parseInt(second[0]) : referenceDate.getHours();
    var minutes = this.isNumeric(second[1]) ? parseInt(second[1]) : 0;
    var seconds = this.isNumeric(second[2]) ? parseInt(second[2]) : 0;

    return new Date(year, month, day, hour, minutes, seconds, 0);
  }

  // SUMMARY: Add 0 in front of date number if he is less than 10
  this.frontZero = function (value) { return value < 10 ? '0' + value : value; }

  // SUMMARY: Check if string is numeric
  this.isNumeric = function (n) { return !isNaN(parseFloat(n)) && isFinite(n); }

  // SUMMARY: Delete value on click X in configuration menu
  this.inputDelete = function () {
    $('.input_delete').click(function () {
      var input = $(this).parent().find('input');
      input.removeClass('select_modified');
      input.attr('value', '')
      input.val('');
    });
  }

  // SUMMARY: Colorize select input that doesn not contains default values
  this.inputChanged = function () {
    this.initialInputChanged();

    // select
    $('#config select').change(function () {
      /*var value = $(this).find('option:selected').attr('value');
      $(this).removeClass('select_modified');
      if (parseInt(value) > -1)
        $(this).addClass('select_modified');*/
      $(this).removeClass('select_modified');
      var index = $(this).find('option:selected').index();
      if (index > 0)
        $(this).addClass('select_modified');
    });

    // text changed
    $('#config input[type=text]').focusout(function () {
      if (typeof $(this).attr('placeholder') === 'undefined' || $(this).attr('placeholder') == '')
        return;

      $(this).removeClass('select_modified');
      if ($(this).val() != '')
        $(this).addClass('select_modified');
    });
  }

  // SUMMARY: Colorize input that doesn not contains default values on start
  this.initialInputChanged = function () {
    // select
    $('#config select').each(function () {
      var value = $(this).find('option:selected').attr('value');
      $(this).removeClass('select_modified');
      if (parseInt(value) > -1)
        $(this).addClass('select_modified');
    });

    // text changed
    $('#config input[type=text]').each(function () {
      if (typeof $(this).attr('placeholder') === 'undefined' || $(this).attr('placeholder') == '')
        return;

      $(this).removeClass('select_modified');
      if ($(this).val() != '')
        $(this).addClass('select_modified');
    });
  }

  // SUMMARY: On 'Delete', set all values to default
  this.deleteKeyDown = function () {
    if ($(':focus').is('input') || $(':focus').is('select'))
      return true;

    //$('#config_limit').val('150');
    //$('#config_from').val(); 
    //$('#config_to').val();
    $('#config_country').val('');
    $('#config_mo').prop("selectedIndex", 0);
    $('#config_service').val('');
    $('#config_msisdn').val('');
    $('#config_pxid').val('');
    $('#config_ip').val('');
    $('#config_contains').val('');
    $('#config_messageDirection').prop("selectedIndex", 0);
    $('#config_messageStatus').prop("selectedIndex", 0);
    $('#congif_messageType').prop("selectedIndex", 0);

    $('.select_modified').each(function () { $(this).removeClass('select_modified'); });

    _manager.load();
    return false;
  }

  // SUMMARY: On 'T', open only values with transacion not NULL or return to default
  this.transactionKeyDown = function (event) {
    if ($(':focus').is('input') || $(':focus').is('select'))
      return true;
    if (event.ctrlKey)
      return true;
    var value = $('#congif_transaction option:selected').attr('value');

    if (value == "1") {
      $('#congif_transaction').prop("selectedIndex", 0);
      if ($('#congif_transaction').hasClass('select_modified'))
        $('#congif_transaction').removeClass('select_modified');
      _system.message('Transactions are set to default');
    }
    else {
      $('#congif_transaction').prop("selectedIndex", 2);
      if (!$('#congif_transaction').hasClass('select_modified'))
        $('#congif_transaction').addClass('select_modified');
      _system.message('Only clicks with transactions are loaded');
    }

    this.close();
    _manager.load();
    return false;
  }

  // SUMMARY: On 'R', open only values with paymentRequest not NULL or return to default
  this.paymentRequestKeyDown = function (event) {
    if ($(':focus').is('input') || $(':focus').is('select'))
      return true;
    if (event.ctrlKey)
      return true;
    var value = $('#config_messageStatus option:selected').attr('value');

    if (value == "1") {
      $('#config_messageStatus').prop("selectedIndex", 0);
      if ($('#config_messageStatus').hasClass('select_modified'))
        $('#config_messageStatus').removeClass('select_modified');
      _system.message('PaymentRequest filter returned to default.');
    }
    else {
      $('#config_messageStatus').prop("selectedIndex", 2);
      if (!$('#config_messageStatus').hasClass('select_modified'))
        $('#config_messageStatus').addClass('select_modified');
      _system.message('Only clicks with PaymentRequest are loaded');
    }

    this.close();
    _manager.load();
    return false;
  }

  // SUMMARY: On 'P' open only values with payment not NULL or return to default
  this.paymentKeyDown = function (event) {
    if ($(':focus').is('input') || $(':focus').is('select'))
      return true;
    if (event.ctrlKey)
      return true;
    var value = $('#congif_messageType option:selected').attr('value');

    if (value == "1") {
      $('#congif_messageType').prop("selectedIndex", 0);
      if ($('#congif_messageType').hasClass('select_modified'))
        $('#congif_messageType').removeClass('select_modified');
      _system.message('Payment filter returned to default.');
    }
    else {
      $('#congif_messageType').prop("selectedIndex", 2);
      if (!$('#congif_messageType').hasClass('select_modified'))
        $('#congif_messageType').addClass('select_modified');
      _system.message('Only clicks with payments are loaded.');
    }

    this.close();
    _manager.load();
    return false;
  }

  this.spaceKeyDown = function (event) {
    if ($(':focus').is('input') || $(':focus').is('select'))
      return true;
    if (event.ctrlKey)
      return true;

    this.updateRefreshTime();
    if (this._refreshEnabled == 1) {
      $('#config_enableRefresh').prop('checked', false);
      this._refreshEnabled = 0;
      _system.message('Auto refresh is disabled');
    }
    else {
      $('#config_enableRefresh').prop('checked', true);
      this._refreshEnabled = 1;
      _system.message('Auto refresh is enabled with ' + this._refreshTime + ' seconds delay and ' + this._limit + ' records to load!', 1500);
      _manager.load();
    }

    return false;
  }

  // SUMMARY: Dynamic show and hide elements based on select properties
  this.selectDynamicShowHide = function () {
    $('#config select').change(function () {
      var elemID = $(this).find('option:selected').attr('change_id');
      var elemDisplay = $(this).find('option:selected').attr('change_id_display');
      if ((typeof elemID === 'undefined' || elemID == null || elemID == '') ||
        (typeof elemDisplay === 'undefined' || elemDisplay == null || elemDisplay == ''))
        return;

      $('#' + elemID).css('display', elemDisplay);
    });
  }

  this.updateRefreshTime = function () {
    this._refreshTime = parseInt($('#config_refresh').val());
    this._refreshEnabled = $('#config_enableRefresh').is(':checked') ? 1 : 0;
  }

  this.open = function () {
    setTimeout(function () { document.getElementById("config_limit").focus(); }, 0);
    this.elem.show();
    this.displayed = true;
  }

  this.close = function (force) {
    if (!force && ($(':focus').is('input') || $(':focus').is('select')))
      return true;

    this.elem.hide();
    this.displayed = false;
    return false;
  }

  this.updateOperators = function () {
    var reference = $('#config_country').val().toUpperCase().split('|');
    var found = 0;

    $('#config_mo option').each(function () {
      if ($(this).attr('id') == 'config_mo_default')
        $(this).attr('selected', 'selected');
      else if (reference.indexOf($(this).attr('country')) > -1) {
        $(this).css('display', 'initial');
        found++;
      }
      else
        $(this).css('display', 'none');
    });
  }

  this.collect = function () {
    this._limit = $('#config_limit').val();
    this._from = $('#config_from').val();
    this._to = $('#config_to').val();
    this._country = $('#config_country').val();
    this._mobileOperator = $('#config_mo option:selected').attr('value');
    this._service = $('#config_service').val();
    this._msisdn = $('#config_msisdn').val();
    this._pxid = $('#config_pxid').val();
    this._messageDirection = $('#config_messageDirection option:selected').attr('value');
    this._messageStatus = $('#config_messageStatus option:selected').attr('value');
    this._messageType = $('#congif_messageType option:selected').attr('value');
  }

  this.setCookies = function () {
    document.cookie = "_limit=" + this._limit + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_country=" + this._country + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_service=" + this._service + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_useOLReference=" + this._useOLReference + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_messageDirection=" + this._messageDirection + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_messageStatus=" + this._messageStatus + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_messageType=" + this._messageType + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_transaction=" + this._transaction + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_groupStats=" + this._groupStats + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";

    this.updateRefreshTime();
    document.cookie = "_refreshTime=" + this._refreshTime + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
    document.cookie = "_refreshEnabled=" + this._refreshEnabled + "; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
  }

  this.params = function () {
    this.collect();
    this.setCookies();
    var data =
    {
      Limit: this._limit,
      From: this._from,
      To: this._to,
      Country: this._country,
      MobileOperator: this._mobileOperator,
      Service: this._service,
      Msisdn: this._msisdn,
      Pxid: this._pxid,
      MessageDirection: this._messageDirection,
      MessageStatus: this._messageStatus,
      MessageType: this._messageType
    };
    return data;
  }

  this.query = function () {
    var params = this.params();
    var query = '';
    for (var key in params) {
      if (query == '') query += '?';
      else query += '&';

      query += key + '=' + params[key];
    }
    return query;
  }

  this.init();
}