using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MobiChat.Live.App_Start.Startup1))]

namespace MobiChat.Live.App_Start
{
  public class Startup1
  {
    public void Configuration(IAppBuilder app)
    {
      app.MapSignalR();
    }
  }
}
