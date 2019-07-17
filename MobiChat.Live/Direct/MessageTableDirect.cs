using MobiChat.Core.Direct;
using MobiChat.Live.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace MobiChat.Live.Direct
{ 
  public class MessageTableDirect : MobiChatDirect
  {

    public MessageTableDirect()
      :base()
    {

    }

    public List<MessageDataTable> Query(MessageInput input)
    {
      string command = string.Empty;
      #region # command #
      command = " SELECT  " +
                " TOP " + input.Limit + " " +
                " m.MessageID, " +
                " m.MessageGuid, " +
                " m.MobileOperatorName, " +
                " m.MessageDirectionID, " +
                " m.MessageTypeID, " +
                " m.MessageStatusID, " +
                " m.TrackingID, " +
                " m.Text,  " +
                " m.Created, " +
                " s.Name, " +
                " c.Msisdn, " +
                " s.Description" +
                " FROM MobiChat.stats.Message AS m " +
                " LEFT OUTER JOIN MobiChat.core.Service AS s ON m.ServiceID=s.ServiceID " +
                " LEFT OUTER JOIN MobiChat.core.Customer AS c ON m.CustomerID=c.CustomerID " +
                " LEFT OUTER JOIN MobiChat.core.MobileOperator AS mo ON m.MobileOperatorID=mo.MobileOperatorID " +
                " WHERE " +
                " ( '" + input.Country + "'='' OR ( s.Description LIKE '" + input.Country + "%' ) )  "  + //-- country " +
                " AND ( '" + input.MobileOperator + "' = '-1' OR ( mo.MobileOperatorID = '" + input.MobileOperator + "' ) ) "  + //-- mobileOperator " +
                " AND ( '" + input.Service + "' = '' OR ( s.Name LIKE '" + input.Service + "' ) )  "  + //-- service " +
                " AND ( '" + input.Msisdn + "' = '' OR ( c.Msisdn = '" + input.Msisdn + "' ) ) "  + //-- msisdn " +
                " AND ( '" + input.Pxid + "' = '-1' OR ( m.TrackingID = " + input.Pxid + " ) ) "  + //-- pxid " +
                " AND ( '" + input.MessageDirection + "' = '-1' OR ( m.MessageDirectionID = "+ input.MessageDirection +" ) )  "  + //-- messageDirection " +
                " AND ( '" + input.MessageStatus + "' = '-1' OR ( m.MessageStatusID = "+ input.MessageStatus +" ) ) "  + //-- messageStatus " +
                " AND ( '" + input.MessageType + "' = '-1' OR ( m.MessageTypeID = "+ input.MessageType +" ) )  " +
                " AND m.Created >= '"+ input.From +"' AND m.Created <= '"+ input.To +"' " +
                " ORDER BY m.MessageID DESC ";
      #endregion

      List<MessageDataTable> result = new List<MessageDataTable>();
      DataTable table = this.Load(command);
      if (table == null)
        return result;

      foreach(DataRow row in table.Rows)
        result.Add(new MessageDataTable()
        {
          MessageID = row[(int)MessageDataTable.Columns.MessageID].ToString(),
          MessageGuid = row[(int)MessageDataTable.Columns.MessageGuid].ToString(),
          MessageOperatorName = row[(int)MessageDataTable.Columns.MessageOperatorName].ToString(),
          MessageDirectionID = row[(int)MessageDataTable.Columns.MessageDirectionID].ToString(),
          MessageTypeID = row[(int)MessageDataTable.Columns.MessageTypeID].ToString(),
          MessageStatusID = row[(int)MessageDataTable.Columns.MessageStatusID].ToString(),
          TrackingID = row[(int)MessageDataTable.Columns.TrackingID].ToString(),
          Text = row[(int)MessageDataTable.Columns.Text].ToString(),
          Created = row[(int)MessageDataTable.Columns.Created].ToString(),
          Service = row[(int)MessageDataTable.Columns.Service].ToString(),
          Msisdn = row[(int)MessageDataTable.Columns.Msisdn].ToString(),
          ServiceDescription = row[(int)MessageDataTable.Columns.ServiceDescription].ToString()
        });

      return result;
    }

  }
}