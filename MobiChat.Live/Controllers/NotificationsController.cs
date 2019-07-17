using MobiChat.Live.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobiChat.Live.Controllers
{
  public class NotificationsController : Controller
  {
    // GET: Notifications
    public ActionResult Index()
    {
      string _class = Request["class"];
      string _pxid = Request["pxid"];
      string _data = Request["data"];

      CommunicationHub.Current.Update(_class, _pxid, _data);
      return this.Json(new { status = true }, JsonRequestBehavior.AllowGet);
    }
  }
}