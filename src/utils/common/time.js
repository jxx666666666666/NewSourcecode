export default class Time {
  static format(fmt, date) {
    let reg = "";
    const opt = {
      "y+": date.getFullYear().toString(), // year
      "M+": (date.getMonth() + 1).toString(), // month
      "d+": date.getDate().toString(), // day
      "H+": date.getHours().toString(), // time
      "m+": date.getMinutes().toString(), // divide
      "s+": date.getSeconds().toString(), // second
    };

    for (let k in opt) {
      reg = new RegExp("(" + k + ")").exec(fmt);
      if (reg) {
        fmt = fmt.replace(
          reg[1],
          reg[1].length == 1 ? opt[k] : opt[k].padStart(reg[1].length, "0")
        );
      }
    }
    return fmt;
  }

  static getWeek(date) {
    const weeks = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = date.getDay();
    return weeks[day];
  }

  static getMonth(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let day = date.getMonth();
    return months[day];
  }

  static addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    return this.format("yyyy-MM-dd", d);
  }
}
// Mount time formatting function
window.Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,

    "d+": this.getDate(),

    "H+": this.getHours(),

    "h+": this.getHours(),

    "m+": this.getMinutes(),

    "s+": this.getSeconds(),

    "q+": Math.floor((this.getMonth() + 3) / 3),

    S: this.getMilliseconds(),
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
};

// Mount and delete a data method within an array
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

// Prohibit right-click to open the inspection view
if (window.Event) {
  window.document.captureEvents(Event.MOUSEUP);
  document.oncontextmenu = function nocontextmenu() {
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
  };
}
// Prohibit right-click to open the inspection view
