var $timezone = $("#timezone");

//初始化加载时区数据信息
$(document).ready(function(){

  displayTime(8);
  $timezone.attr("onChange","selectTimezone()");

   $.ajax({
   url:"json/timezone.json",

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
   console.log(textStatus);
   }
   });
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
