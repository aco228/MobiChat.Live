using MobiChat.Live.Direct;
using MobiChat.Live.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobiChat.Live.Controllers
{
  public class MessageController : Controller
  {
    public ActionResult Index()
    {
      return View();
    }

    public ActionResult GetData(MessageInput input)
    {
      input.Validate();
      MessageTableDirect direct = new MessageTableDirect();
      List<MessageDataTable> result = direct.Query(input);
      return View("~/Views/Message/_MessageData.cshtml", result);
    }

  }
}