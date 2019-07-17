using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MobiChat.Live
{
  public class RouteConfig
  {
    public static void RegisterRoutes(RouteCollection routes)
    {
      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

      routes.MapRoute(name: "Landing", url: "live", defaults: new { controller = "Home", action = "Landing" });
      routes.MapRoute(name: "Messages", url: "msg", defaults: new { controller = "Message", action = "Index" });
      routes.MapRoute(name: "Notifications", url: "_ntf", defaults: new { controller = "Notifications", action = "Index" });

      routes.MapRoute(
          name: "Default",
          url: "{controller}/{action}/{id}",
          defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
      );
    }
  }
}
