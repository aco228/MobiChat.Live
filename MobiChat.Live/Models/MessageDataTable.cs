using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MobiChat.Live.Models
{
  public class MessageDataTable
  {
    private string _messageID = string.Empty;
    private string _messageGuid = string.Empty;
    private string _messageOperatorName = string.Empty;
    private string _messageDirectionID = string.Empty;
    private string _messageTypeID = string.Empty;
    private string _messageStatusID = string.Empty;
    private string _trackingID = string.Empty;
    private string _text = string.Empty;
    private string _created = string.Empty;
    private string _service = string.Empty;
    private string _msisdn = string.Empty;
    private string _serviceDescription = string.Empty;

    public string MessageID { get { return _messageID; } set { _messageID = value; } }
    public string MessageGuid { get { return _messageGuid; } set { _messageGuid = value; } }
    public string MessageOperatorName { get { return this._messageOperatorName; } set { this._messageOperatorName = value; } }
    public string MessageDirectionID { get { return this._messageDirectionID; } set { this._messageDirectionID = value; } }
    public string MessageTypeID { get { return this._messageTypeID; } set { this._messageTypeID = value; } }
    public string MessageStatusID { get { return this._messageStatusID; } set { this._messageStatusID = value; } }
    public string TrackingID { get { return this._trackingID; } set { this._trackingID = value; } }
    public string Text { get { return this._text; } set { this._text = value; } }
    public string Created { get { return this._created; } set { this._created = value; } }
    public string Service { get { return this._service; } set { this._service = value; } }
    public string Msisdn { get { return this._msisdn; } set { this._msisdn = value; } }
    public string ServiceDescription { get { return this._serviceDescription; } set { this._serviceDescription = value; } }

    public enum Columns
    {
      MessageID = 0,
      MessageGuid = 1,
      MessageOperatorName = 2,
      MessageDirectionID = 3,
      MessageTypeID = 4,
      MessageStatusID = 5,
      TrackingID = 6,
      Text = 7,
      Created = 8,
      Service = 9,
      Msisdn = 10,
      ServiceDescription = 11
    }

    public string MessageClass { get { return this._messageDirectionID.Equals("1") ? "message_in" : "message_out"; } }
    public string Direction { get { return this._messageDirectionID.Equals("1") ? "►" : "◄"; } }
    public string DirectionClass { get { return this._messageDirectionID.Equals("1") ? "direction_in" : "direction_out"; } }

    public string Status
    {
      get
      {
        switch (this._messageStatusID)
        {
          default:
          case "5": return "Received";
          case "6": return "Sent";
          case "7": return "Delivered";
          case "8": return "Not_delivered";
        }
      }
    }

    public string Type
    {
      get
      {
        switch (this._messageTypeID)
        {
          case "1": return "MO";
          case "2": return "MT";
          case "3": return "MT_Free";
          case "4": return "MT_Welcome";
          default: return "";
        }
      }
    }

    public string Country { get { return this.ServiceDescription.Split(',')[0].ToLower(); } }


  }
}