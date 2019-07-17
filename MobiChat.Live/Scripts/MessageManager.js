function MessageManager()
{
  this.configuration = null;
  this.window = null;
  this.dataContent = null;
  this.loading = null;
  this.inLoading = false;
  this._refreshTimer = null;

  // SUMMARY: Constructor
  this.init = function()
  {
    this.configuration = new DatabaseConfigurationManager();
    //this.window = new WindowManager();
    this.catchKey();
    this.dataContent = $('#messageContent');
    this.loading = $('#data_loading');
    //this.loading.css('opacity', '1');
    this.load();
    this.downloadCsv();
    this.collectPxids();
  }

  // SUMMARY: Catches keyboard keys
  this.catchKey = function ()
  {
    var self = this;
    document.onkeydown = function (evt) {
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13) { return self.onEnter(evt);  }
      else if (keyCode == 9) { return self.onTab(evt); }
      else if (keyCode == 27) { return self.onEscape(evt); }
      else if (keyCode == 80) { return self.configuration.paymentKeyDown(evt); } // p
      else if (keyCode == 82) { return self.configuration.paymentRequestKeyDown(evt); } // r
      else if (keyCode == 84) { return self.configuration.transactionKeyDown(evt); } // t
      else if (keyCode == 46) { return self.configuration.deleteKeyDown(evt); } // delete
      else return true;
    };
  }

  // SUMMARY: Event ESC (close all windows)
  this.onEscape = function ()
  {
    if (this.configuration.displayed)
      this.configuration.close(true);

    return false;
  }

  // SUMMARY: Event Enter (load again)
  this.onEnter = function ()
  {
    this.configuration.close(true);
    this.load();
    return false;
  }
  
  // SUMMARY: Event Tab (open configuration window)
  this.onTab = function(event)
  {
    if (!this.configuration.displayed)
      this.configuration.open();
    else
      return this.configuration.close(false);

    return false;
  }

  // SUMMARY: Refresh automation, calls load method after adjusted time
  this.refreshManager = function()
  {
    var self = this;
    this.configuration.updateRefreshTime();
    clearTimeout(this._refreshTimer);

    if (this.configuration._refreshEnabled == 0)
      return;
    
    this._refreshTimer = setTimeout(function () {
      console.log('Refresh made...');

      if(!self.inLoading)
        self.load();

      self.refreshManager();
    }, this.configuration._refreshTime * 1000);
  }

  // SUMMARY: Double click on entry in main_table.. opens informations for that click
  this.doubleClick = function(elem)
  {
    var elem = $(elem);
    var msgID = elem.attr('messageID');
    var msgGuid = elem.attr('messageGuid');
    var pxid = elem.attr('pxid');

    console.log(pxid);

    var win = window.open('/report?msgID='+msgID+'&msgGuid='+msgGuid+'&pxid='+pxid, '_blank');
    win.focus();
  }
  
  // SUMMARY: Loads data in main_table
  this.load = function()
  {
    var self = this;
    this.loading.css('opacity', '1');
    this.inLoading = true;
    var start = new Date();

    this.call('Load', this.configuration.params(), function (response) {
      self.inLoading = false;
      var time = new Date() - start;
      $('#database_time').html(time + 'ms');

      self.dataContent.html(response);
      self.loading.css('opacity', '0');

      var count = parseInt($('#messageContent').find('.message').length);
      $('#database_count').text(count);
      $('#database_lastUpdate').text($('#tableData').attr('created'))
      self.refreshManager();
    });
  }

  // SUMMARY: Event for downloading .csv for data that is presented
  this.downloadCsv = function()
  {
    var self = this;
    $('#database_downloadCsv').click(function () {
      var win = window.open('/database/Csv' +  self.configuration.query());
      win.focus();
    });
  }

  this.collectPxids = function()
  {
    var self = this;
    $('#database_collectPxids').click(function () {
      
      var pxids = '';
      $('#tableData tr').each(function () {
        var pxid = $(this).find('.usPxid').text();
        if (typeof pxid !== 'undefined' && pxid != null && pxid != '')
          pxids += pxid + '\n';
      });

      if (!self.window.displayed)
        self.window.showData(pxids);
      else
        self.window.close();

    });
  }

  // SUMMARY: database shared ajax call
  this.call = function(url, data, succ_func)
  {
    $.ajax({
      url: '/message/GetData',
      data: data,
      method: 'POST',
      success: function (response) { succ_func(response);}
    });
    //_system.ajax('/database/' + url, data, 'POST', function (response) {
    //  if (typeof succ_func === 'function') succ_func(response);
    //});


  }

  this.init();
}