var accessToken = 'c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565';
var lifxState;
var automation = true;

// var lifxAutomation = function(){
//   if (automation) {
//     console.log('automation')

  // }else {
  //   console.log('auto stop')
  //   return;
  // }
//}

var toggleState = function(selector){
  $.ajax('https://api.lifx.com/v1/lights/' + selector + '/toggle', {
    type: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565",
    },
    dataType: 'application/json',
  }).always(function (data ) {
    var response = JSON.parse(data.responseText);
    console.log(response);
    setTimeout(function() {lightStatus('all');}, 1000);
  });
};

var lightStatus = function(selector) {
  $.ajax('https://api.lifx.com/v1/lights/all/', {
    type: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565",
    },
    dataType: 'application/json',
  }).always(function (data ) {
    var response = JSON.parse(data.responseText);
    lifxState = response[0];
    $('#lifxstate').html((lifxState.power).toUpperCase());
    $('#lifxkelvin').html(lifxState.color.kelvin);
    $('#hue').html(lifxState.color.hue.toFixed(3));
    $('#lifxbrightness').html(lifxState.brightness.toFixed(2));
    $('#lifxlocation').html(lifxState.location.name);
    if (lifxState.power === "on") {
    console.log('modeon')
      $('#state').addClass('modeOn')
    }else if(lifxState.power === "off") {
      $('#state').removeClass('modeOn')
    }
    console.log(response);
  });
};



// var lightStatus = function(selector) {
//   $.ajax('https://api.lifx.com/v1/lights/all/', {
//     type: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565",
//     },
//     dataType: 'application/json',
//   }).always(function (data ) {
//     var response = JSON.parse(data.responseText);
//     lifxState = response[0];
//     $('#lifxstate').html((lifxState.power).toUpperCase());
//     $('#lifxkelvin').html(lifxState.color.kelvin);
//     $('#hue').html(lifxState.color.hue.toFixed(3));
//     $('#lifxbrightness').html(lifxState.brightness.toFixed(2));
//     console.log(response);
//   });
// };

var setKelvin = function(color){
  $.ajax('https://api.lifx.com/v1/lights/all/state', {
    type: 'PUT',
    headers: {
      "Authorization": "Bearer c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565",
    },
    data: {
      "color": "kelvin:" + color
    }
  }).always(function (data ) {
    console.log(data);
    lightStatus('all');
  });
};

var setState = function(bri, dur, color){
  $.ajax('https://api.lifx.com/v1/lights/all/state', {
    type: 'PUT',
    headers: {
      "Authorization": "Bearer c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565",
    },
    data: {
      "brightness": bri,
      "duration": dur,
      "color": color
    }
  }).always(function (data ) {
    console.log(data);
  });
};

var setAlarm = function(power, bri, dur, color){
  $.ajax('https://api.lifx.com/v1/lights/all/state', {
    type: 'PUT',
    headers: {
      "Authorization": "Bearer c1ae1d5656a66e325185d9053223b6a0ec2212638a6ff84b52c720d976b9b565",
    },
    data: {
      "power": power,
      "brightness": bri,
      "duration": dur,
      "color": color
    }
  }).always(function (data ) {
    console.log(data);
    lightStatus('all');
  });
};
var wakeupAlarm = function() {
  console.log(wakeup);
  setTimeout(function () { setAlarm('on', 0.3, 60, 'kelvin:3000'); }, wakeup);
  console.log('wakeupAlarm set');
};


var autoBrightness = function() {
  if (!automation) { return; }
    if ((brightness <= 0.19) && (brightness >= 0.1)){
      setState(0.1, 1);
      $("#lifxbrightness").text( 0.1 );
    }else if ((brightness <= 0.29) && (brightness >= 0.2)){
      setState(0.2, 1);
      $("#lifxbrightness").text( 0.2 );
    }else if ((brightness <= 0.39)  && (brightness >=0.3)){
      setState(0.3, 1);
      $("#lifxbrightness").text( 0.3 );
    }else if ((brightness <= 0.49) && (brightness >= 0.4)){
      setState(0.4, 1);
      $("#lifxbrightness").text( 0.4 );
    }else if ((brightness <= 0.59) && (brightness >= 0.5)){
      setState(0.5, 1);
      $("#lifxbrightness").text( 0.5 );
    }else if ((brightness <= 0.69) && (brightness >= 0.6)){
      setState(0.6, 1);
      $("#lifxbrightness").text( 0.6 );
    }else if ((brightness <= 0.79) && (brightness >= 0.7)){
      setState(0.7, 1);
      $("#lifxbrightness").text( 0.7 );
    }else if ((brightness <= 0.89) && (brightness >= 0.8)){
      setState(0.8, 1);
      $("#lifxbrightness").text(0.89);
    }else if (brightness > 0.9) {
      setBrightness('all', 0.9, 1);
    }
};
setInterval(autoBrightness, 2000);
// lightStatus('all');
// toggleState('all')

$(document).ready(function () {
  lightStatus('all');
  $('.clockpicker').clockpicker();
  moment().format();

  var gridster = $(".gridster ul").gridster({
        widget_margins: [20,10],
        widget_base_dimensions: [140, 140]
    }).data("gridster");

  $('#state').on('click', function() {
    toggleState('all');
    lightStatus('all');
  });

  $('#demo').on('click', function() {
    console.log('demomode')
    demo();
  })

  // $('#kelvin').on('click', function() {
  //   gridster.add_widget("<li class='grid light' id='2500'>Ultra Warm</li>",1,1,2,1);
  //   gridster.add_widget("<li class='grid light' id='3000'>Warm</li>",1,1,3,1);
  //   gridster.add_widget("<li class='grid light' id='3500'>Neutral</li>",1,1,2,2);
  //   gridster.add_widget("<li class='grid light' id='4000'>Cool</li>",1,1,3,2);
  //   gridster.add_widget("<li class='grid light' id='4500'>Cool Daylight</li>",1,1,2,3);
  //   gridster.add_widget("<li class='grid light' id='5000'>Soft Daylight</li>",1,1,3,3);
  //   gridster.add_widget("<li class='grid light' id='7000'>Blue Daylight</li>",1,1,2,4);
  //   gridster.add_widget("<li class='grid light' id='9000'>Blue Ice</li>",1,1,3,4);

  // });

  $('.gridster').on('click', '.grid.light', function() {
    var light = $(this).attr('data');
    setKelvin(light);
    // gridster.remove_widget( $('.light').eq(0));
    // gridster.remove_widget( $('.light').eq(1));
    // gridster.remove_widget( $('.light').eq(2));
    // gridster.remove_widget( $('.light').eq(3));
    // gridster.remove_widget( $('.light').eq(4));
    // gridster.remove_widget( $('.light').eq(5));
    // gridster.remove_widget( $('.light').eq(6));
    // gridster.remove_widget( $('.light').eq(7));
  });

  //   $('#mode.auto').on('click', function() {
  // $(this).removeClass('auto');
  // $('span.lifxmode').html("Manual");
  // automation = false;
  //   });

  $('#mode').on('click', function(){
    if ($(this).hasClass("auto")) {
      $(this).removeClass('auto');
      $('span#lifxmode').html("Manual");
      automation = false;
    } else {
      $(this).addClass('auto');
      $('span#lifxmode').html("Automatic");
      automation = true;
      lifxAutomation();
    }
  });

});

var demo = function(){
  setAlarm('on', 0.1, 5, 'kelvin:3000');
  automation = false;
  setTimeout(function () { setAlarm('on', 0.3, 10, 'kelvin:7000'); automation = true; console.log('day'); }, 15000);
  setTimeout(function () { setAlarm('on', 0.1, 10, 'kelvin:3000'); automation = false; console.log('night'); }, 25000);
  setTimeout(function () { setAlarm('off', 0.1, 10, 'kelvin:3000'); automation = false; console.log('sleep') }, 45000);
};