using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MobiChat.Live.Models
{
  public class MessageInput
  {
    #region # input #

    private string _limit = "100";
    private string _from = string.Empty;
    private string _to = string.Empty;
    private string _country = string.Empty;
    private string _mobileOperator = string.Empty;
    private string _service = string.Empty;
    private string _msisdn = string.Empty;
    private string _pxid = string.Empty;
    private string _messageDirection = string.Empty;
    private string _messageStatus = string.Empty;
    private string _messageType = string.Empty;

    public string Limit { get { return _limit; } set { _limit = value; } }
    public string From { get { return _from; } set { _from = value; } }
    public string To { get { return _to; } set { _to = value; } }
    public string Country { get { return _country; } set { _country = value; } }
    public string MobileOperator { get { return _mobileOperator; } set { _mobileOperator = value; } }
    public string Service { get { return _service; } set { _service = value; } }
    public string Msisdn { get { return _msisdn; } set { _msisdn = value; } }
    public string Pxid { get { return _pxid; } set { _pxid = value; } }
    public string MessageDirection { get { return _messageDirection; } set { _messageDirection = value; } }
    public string MessageStatus { get { return _messageStatus; } set { _messageStatus = value; } }
    public string MessageType { get { return _messageType; } set { _messageType = value; } }

    #endregion 

    public void Validate()
    {
      int reference = -1; DateTime dateReference;
      if (!Int32.TryParse(this._limit, out reference))
        this._limit = "100";
      if(!Int32.TryParse(this._pxid, out reference))
        this._pxid = "-1";
      if (!Int32.TryParse(this._messageDirection, out reference))
        this._messageDirection = "-1;";
      if (!Int32.TryParse(this._messageStatus, out reference))
        this._messageStatus = "-1;";
      if (!Int32.TryParse(this._messageType, out reference))
        this._messageType = "-1;";
      if (!Int32.TryParse(this._mobileOperator, out reference))
        this._mobileOperator = "-1;";
      if (!DateTime.TryParse(this._from, out dateReference))
        this._from = DateTime.Now.ToString();
      if (!DateTime.TryParse(this._to, out dateReference))
        this._to = DateTime.Now.ToString();
    }

  }
}