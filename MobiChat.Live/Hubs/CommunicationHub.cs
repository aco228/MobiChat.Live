using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MobiChat.Live.Hubs
{
  public class CommunicationHub : Hub
  {

    public static CommunicationHub Current
    {
      get
      {
        return new CommunicationHub(GlobalHost.ConnectionManager.GetHubContext<CommunicationHub>());
      }
    }
    
    private IHubContext _context = null;

    public CommunicationHub(IHubContext context)
    {
      this._context = context;
    }

    public void Update(string klass, string pxid, string data)
    {
      var sendData = new
      {
        _class = klass,
        _pxid = pxid,
        _data = data,
        _time = DateTime.Now.ToString()
      };

      if (this._context != null)
        this._context.Clients.All.update(sendData);
      else
        this.Clients.All.update(sendData);
    }

  }
}