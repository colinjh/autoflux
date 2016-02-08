var accessToken = 'cc967fcb202d5d681fb454960fb70ebb6f29457b43af4a55775ce3af5bd60233:';
var lifxState;

var toggleState = function(selector){
  $.ajax('https://api.lifx.com/v1/lights/' + selector + '/toggle', {
    type: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer cc967fcb202d5d681fb454960fb70ebb6f29457b43af4a55775ce3af5bd60233",
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
      "Authorization": "Bearer cc967fcb202d5d681fb454960fb70ebb6f29457b43af4a55775ce3af5bd60233",
    },
    dataType: 'application/json',
  }).always(function (data ) {
    var response = JSON.parse(data.responseText);
    lifxState = response[0];
    $('#state').html(lifxState.power);
    $('#kelvin').html(lifxState.color.kelvin);
    $('#hue').html(lifxState.color.hue.toFixed(3));
    $('#lifxbrightness').html(lifxState.brightness);
    console.log(response);
  });
};

var setBrightness = function(selector, num){
  $.ajax('https://api.lifx.com/v1/lights/' + selector + '/state', {
    type: 'PUT',
    headers: {
      // "Content-Type": "application/json",
      "Authorization": "Bearer cc967fcb202d5d681fb454960fb70ebb6f29457b43af4a55775ce3af5bd60233",
    },
    // dataType: 'application/json',
    data: {
      "brightness": num
    }
    // dataType: 'JSON',
    // contentType: "application/json"
    // data: JSON.stringify({ brightness: 0.3 }),
  }).always(function (data ) {
    console.log(data);
    lightStatus('all')
  });
};

// lightStatus('all');
// toggleState('all')

$(document).ready(function () {
  lightStatus('all');

});