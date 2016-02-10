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
    setInterval(lightStatus('all'), 500);
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
    $('#lifxstate').html(lifxState.power);
    $('#lifxkelvin').html(lifxState.color.kelvin);
    $('#hue').html(lifxState.color.hue.toFixed(3));
    $('#lifxbrightness').html(lifxState.brightness);
    console.log(response);
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

var autoBrightness = function() {
  if (!automation) { return; };
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
    }else if (brightness > .90) {
      setBrightness('all', 0.9, 1)
    }
};
setInterval(autoBrightness, 2000);
// lightStatus('all');
// toggleState('all')

$(document).ready(function () {
  lightStatus('all');

  var gridster = $(".gridster ul").gridster({
        widget_margins: [5,5],
        widget_base_dimensions: [140, 140]
    }).data("gridster");
  // gridster.remove_widget($(this).parent())

  $('state').on('click', function() {
    toggleState('all');
  });

  $('#kelvin').on('click', function() {
    gridster.add_widget("<li class='grid light' id='2500'>Ultra Warm</li>",1,1,2,1);
    gridster.add_widget("<li class='grid light' id='3000'>Warm</li>",1,1,3,1);
    gridster.add_widget("<li class='grid light' id='3500'>Neutral</li>",1,1,2,2);
    gridster.add_widget("<li class='grid light' id='4000'>Cool</li>",1,1,3,2);
    gridster.add_widget("<li class='grid light' id='4500'>Cool Daylight</li>",1,1,4,2);
    gridster.add_widget("<li class='grid light' id='5000'>Soft Daylight</li>",1,1,4,3);
    gridster.add_widget("<li class='grid light' id='7000'>Blue Daylight</li>",1,1,2,4);
    gridster.add_widget("<li class='grid light' id='9000'>Blue Ice</li>",1,1,4,2);

  });

  $('.gridster').on('click', '.grid.light', function() {
    console.log('lightremove')
    gridster.remove_widget( $('.light').eq(0));
    gridster.remove_widget( $('.light').eq(1));
    gridster.remove_widget( $('.light').eq(2));
    gridster.remove_widget( $('.light').eq(3));
    gridster.remove_widget( $('.light').eq(4));
    gridster.remove_widget( $('.light').eq(5));
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
      $('span#lifxmode').html("Automatic")
      automation = true;
      lifxAutomation();
    }
  });

});