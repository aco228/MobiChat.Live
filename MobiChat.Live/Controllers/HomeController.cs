using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobiChat.Live.Controllers
{
  public class HomeController : Controller
  {

    public ActionResult Index()
    {
      return this.Content("restricted");
    }

    public ActionResult Landing()
    {
      return View();
    }

    public ActionResult Messages()
    {
      return View();
    }

  }
}