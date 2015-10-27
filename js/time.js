var $timezone = $("#timezone");

//初始化加载时区数据信息
$(document).ready(function(){

  displayTime(8);
  $timezone.attr("onChange","selectTimezone()");
  $.each(timezoneJson,function(i,val){
    var opt = new Option(val.city+"("+val.timezone+val.offset+")",val.offset);
    $timezone.append(opt);
  });
  /*
   //在IE 和 Chrome 下不支持本地ftp:协议，不能异步获取时区数据， 
   //解决方案：1. 部署到server. 2. 使用firefox执行文件。
   //此处为方便起见，将数据直接保存在json数组中。

   $.ajax({
   //url:"json/timezone.json",

   type:"get",
   contentType: "text/plain;charset=utf-8",
   dataType:'json',
   success:function(data){
   $timezone.attr("onChange","selectTimezone()");
   console.dir(data);
   console.log("Hello!");
   $.each(data,function(i,val){
   var opt = new Option(val.city+"("+val.timezone+val.offset+")",val.offset);
   $timezone.append(opt);
   });
   },
   error:function(XMLHttpRequest, textStatus, errorThrown){
   alert('load json failure! If you are using Chrome or IE, please turn to Firefox open the index.html');
   console.log(textStatus);
   }
   });*/
});

//选择时区，显示当前时区的时间
var selectTimezone = function() {
  displayTime();
}

//得到UTC标准时间
var calcTime = function(offset) {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*offset));
  return nd;
}

//时分秒是一位数的则前面补0，格式化为两位数
var formatTimeDisplay = function(xx){
  return  xx<10?"0"+xx:xx;
}

//实时获取并显示时间
var displayTime = function(){
  var offset = $('#timezone option:selected').val();
  var date = calcTime(offset);
  var hour = formatTimeDisplay(date.getHours());
  var minute = formatTimeDisplay(date.getMinutes());
  var second = formatTimeDisplay(date.getSeconds());
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var weekday_temp = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六")
  var weekday = weekday_temp[date.getDay()];
  $("#date").html(year+"年"+month+"月"+day+"日");
  $("#weekday").html(weekday);
  $("#time").html(hour +":" + minute+":" + second);

  setTimeout(function() {
    displayTime();
  }, 500);
}



var timezoneJson =[
  {
    "id":0,
    "timezone": "IDL",
    "offset": "-12",
    "city":"Baker Island",
    "name":"伊尼威托克"
  },
  {
    "id": 1,
    "timezone": "MIT",
    "offset": "-11",
    "city":"American Samoa",
    "name":"萨摩亚"
  },
  {
    "id":2,
    "timezone":"HST",
    "offset":"-10",
    "city":"Hawaii",
    "name":"夏威夷"
  },
  {
    "id":3,
    "timezone":"MSIT",
    "offset":"-9.5",
    "city":"Marquesas Islands",
    "name":"马克萨斯群岛"
  },
  {
    "id":4,
    "timezone":"AKST",
    "offset":"-9",
    "city":"Alaska",
    "name":"阿拉斯加"
  },
  {
    "id":5,
    "timezone":"PSTA",
    "offset":"-8",
    "city":"Pacific Time - north Yukon",
    "name":"太平洋标准时间A"
  },
  {
    "id":6,
    "timezone":"MST",
    "offset":"-7",
    "city":"Mountain Time - west Nunavut",
    "name":"北美山区"
  },
  {
    "id":7,
    "timezone":"CST",
    "offset":"-6",
    "city":"Central Time",
    "name":"北美中部标准时间"
  },
  {
    "id":8,
    "timezone":"EST",
    "offset":"-5",
    "city":"Eastern Standard Time",
    "name":"北美东部标准时间"
  },
  {
    "id":9,
    "timezone":"RVT",
    "offset":"-4.5",
    "city":"Venezuela",
    "name":"委内瑞拉标准时间"
  },
  {
    "id":10,
    "timezone":"AST",
    "offset":"-4",
    "city":"Atlantic Time",
    "name":"大西洋标准时间"
  },
  {
    "id":11,
    "timezone":"NST",
    "offset":"-3.5",
    "city":"Newfoundland",
    "name":"纽芬兰岛标准时间"
  },

  {
    "id":12,
    "timezone":"SAT",
    "offset":"-3",
    "city":"South America",
    "name":"南美标准时间"
  },
  {
    "id":13,
    "timezone":"BRT",
    "offset":"-2",
    "city":"Brazil",
    "name":"巴西时间"
  },
  {
    "id":14,
    "timezone":"CVT",
    "offset":"-1",
    "city":"Azores",
    "name":"佛得角标准时间"
  },
  {
    "id":15,
    "timezone":"UTC",
    "offset":"0",
    "city":"Spain",
    "name":"格林威治标准时间"
  },
  {
    "id":16,
    "timezone":"CET",
    "offset":"+1",
    "city":"Rome",
    "name":"欧洲中部时区"
  },
  {
    "id":17,
    "timezone":"EET",
    "offset":"+2",
    "city":"Israel",
    "name":"欧洲东部标准时间"
  },
  {
    "id":18,
    "timezone":"MSK",
    "offset":"+3",
    "city":"Moscow",
    "name":"莫斯科时区"
  },
  {
    "id":19,
    "timezone":"IRT",
    "offset":"+3.5",
    "city":"Tehran",
    "name":"伊朗标准时间"
  },
  {
    "id":20,
    "timezone":"NST",
    "offset":"+4",
    "city":"Baku",
    "name":"中东时区A"
  },

  {
    "id":21,
    "timezone":"AFT",
    "offset":"+4.5",
    "city":"Kabul",
    "name":"阿富汗标准时间"
  },
  {
    "id":22,
    "timezone":"METB",
    "offset":"+5",
    "city":"New Delhi",
    "name":"中东时区B"
  },
  {
    "id":23,
    "timezone":"CVT",
    "offset":"+5.5",
    "city":"Calcutta",
    "name":"印度标准时间"
  },
  {
    "id":24,
    "timezone":"BHT",
    "offset":"+6",
    "city":"Dhaka",
    "name":"孟加拉标准时间"
  },
  {
    "id":25,
    "timezone":"MRT",
    "offset":"+6.5",
    "city":"Cocos",
    "name":"缅甸标准时间"
  },
  {
    "id":26,
    "timezone":"MST",
    "offset":"+7",
    "city":"Bangkok",
    "name":"中南半岛标准时间"
  },
  {
    "id":27,
    "timezone":"EAT",
    "offset":"+8",
    "city":"Beijing",
    "name":"东亚标准时间"
  },

  {
    "id":28,
    "timezone":"KRT",
    "offset":"+8.5",
    "city":"Pyongyang",
    "name":"朝鲜标准时间"
  },
  {
    "id":29,
    "timezone":"FET",
    "offset":"+9",
    "city":"Tokyo",
    "name":"远东标准时间"
  },
  {
    "id":30,
    "timezone":"CVT",
    "offset":"+9.5",
    "city":"Darwin",
    "name":"澳大利亚中部标准时间"
  },
  {
    "id":31,
    "timezone":"AEST",
    "offset":"10",
    "city":"Sydney",
    "name":"澳大利亚东部标准时间"
  },
  {
    "id":32,
    "timezone":"VTT",
    "offset":"+11",
    "city":"Magadan",
    "name":"瓦努阿图标准时间"
  },
  {
    "id":33,
    "timezone":"PSTB",
    "offset":"+12",
    "city":"Wellington",
    "name":"太平洋标准时间B"
  },
  {
    "id":34,
    "timezone":"PSTC",
    "offset":"+13",
    "city":"Apia",
    "name":"太平洋标准时间C"
  },
  {
    "id":32,
    "timezone":"PSTD",
    "offset":"+14",
    "city":"Kiritimati",
    "name":"太平洋标准时间D"
  }
]
