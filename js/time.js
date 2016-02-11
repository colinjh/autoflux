var wakeup;

var minutesUntilMidnight = function () {
    var midnight = new Date();
    midnight.setHours( 24, 0, 0, 0 );
    return ( midnight.getTime() - new Date().getTime() );;
};

var input = $('#time1');
input.clockpicker({
    autoclose: true,
    afterDone: function() {
      console.log('timedone')
      var text = $('input').val();

      var d = Date.now();
      var msToMidnight = minutesUntilMidnight();

      wakeup = (moment.duration(text)._milliseconds) + msToMidnight;
      var wakeupTimestamp = wakeup + d;
      wakeupAlarm();

      console.group()
      console.log("Time now: ", moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"));
      console.log("Time until alarm: ", moment(wakeup).unix());
      console.log("Timestamp of alarm: ", moment(wakeupTimestamp).format("dddd, MMMM Do YYYY, h:mm:ss a") );
      console.groupEnd();
    }
});

var input2 = $('#time2');
input2.clockpicker({
    autoclose: true,
    afterDone: function() {
      console.log('timedone')
      var text = $('input').val();
      console.log(text)
      // var d = Date.now();
      // var msToMidnight = minutesUntilMidnight();

      // var wakeup = (moment.duration(text)._milliseconds) + msToMidnight;
      // var wakeupTimestamp = wakeup + d;

      // console.group()
      // console.log("Time now: ", moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"));
      // console.log("Time until alarm: ", moment(wakeup).unix());
      // console.log("Timestamp of alarm: ", moment(wakeupTimestamp).format("dddd, MMMM Do YYYY, h:mm:ss a") );
      // console.groupEnd();
    }
});

var input3 = $('#time3');
input3.clockpicker({
    autoclose: true
});

var input4 = $('#time4');
input4.clockpicker({
    autoclose: true
});