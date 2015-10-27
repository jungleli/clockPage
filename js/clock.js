var clock = document.getElementById('clock');
var ctx = clock.getContext('2d');
var radius = 120;
ctx.translate(clock.width/2, clock.height/2);//重新映射（0，0）
ctx.rotate(-Math.PI / 2);//旋转至12点钟的方向

//画时钟的表盘
var drawClockPanel = function(clockRadius){
    ctx.save();
    ctx.lineCap = "round";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(100,100,150,.8)";
    ctx.strokeStyle="#908D8F";
    ctx.beginPath();
    ctx.arc(0,0,clockRadius,0,Math.PI*2,false);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

//填充表盘
var fillClockPanel = function(){
    ctx.save();
    var grd = ctx.createRadialGradient(0,0,30,20,20,100);
    ctx.fillStyle="rgba(211,222,221,.3)";
    ctx.fill();
    ctx.restore();
}

//画时钟的表心
var drawCenter = function(){
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

//画时钟刻度
var drawScale = function(scaleNum, angle, radius, scaleLen, lineWidth){
  var angle_temp = 0;
    ctx.save();
    for(var i = 0; i < scaleNum; i++) {
        angle_temp += angle;
        ctx.beginPath();
        var start_x = radius * Math.sin(angle_temp);
        var start_y = radius * Math.cos(angle_temp);
        var end_x = (radius-scaleLen) * Math.sin(angle_temp);
        var end_y = (radius-scaleLen) * Math.cos(angle_temp);
        ctx.lineWidth = lineWidth;
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(end_x, end_y);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}

//画分秒针
var drawHandler = function(handLen, role, angle, lineWidth,lineColor){
    var end_x = handLen * Math.cos(angle * role);
    var end_y = handLen * Math.sin(angle * role);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(end_x, end_y);
    ctx.lineTo(-end_x/5, -end_y/5);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

//根据时差值计算当前时区的时间
var calcTime =function(offset){
    var d = new Date();
    //得到UTC标准时间
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return nd;
}

var drawClock = (function drawClock() {
    ctx.clearRect(-clock.width/2, -clock.height/2, clock.width, clock.height);
    drawClockPanel(radius);
    drawClockPanel(radius-5);
    fillClockPanel();
    drawCenter();
    drawScale(12, Math.PI/6,radius-10, 10, 2); //12个小时刻度线
    drawScale(60, Math.PI/30, radius-10, 2, 1); //60个分针刻度线
    //获取当前时间
    var offset = $('#timezone option:selected').val();
    var date = calcTime(offset);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    //转换上下午时间
    hour = hour >= 12 ? hour - 12 : hour;
    hour += minute/60;
    drawHandler(100, second, Math.PI/30, 1,"red"); //秒针
    drawHandler(85, minute, Math.PI/30, 2); //分针
    drawHandler(65, hour, Math.PI/6, 3);//时针

    setTimeout(function() {
        drawClock();
    }, 500);
})();