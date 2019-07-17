using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MobiChat.Live.Models
{
  public class ReportModel
  {
    private string _messageID = string.Empty;
    private string _messageGuid = string.Empty;
    private string _cashflowGuid = string.Empty;
    private string _pxid = string.Empty;

    public string MessageID { get { return this._messageID; } set { this._messageID = value; } }
    public string MessageGuid { get { return this._messageGuid; } set { this._messageGuid = value; } }
    public string CashflowGuid { get { return this._cashflowGuid; } set { this._cashflowGuid = value; } }
    public string Pxid { get { return this._pxid; } set { this._pxid = value; } }
  }
}