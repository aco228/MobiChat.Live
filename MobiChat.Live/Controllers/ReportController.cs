using MobiChat.Live.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobiChat.Live.Controllers
{
  public class ReportController : Controller
  {
    public ActionResult Index()
    {
      ReportModel model = new ReportModel()
      {
        MessageID = Request["msgID"],
        MessageGuid = Request["msgGuid"],
        Pxid = Request["pxid"]
      };
      return View(model);
    }
  }
}