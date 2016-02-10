setTargetAddress('beaglebone.local', {
    initialized: run
});
setTargetAddress('192.168.7.2', {
    initialized: run
});
var sensor_reading = 0;

function run() {
    var b = require('bonescript');
    var ain = [];

    for (var j = 0; j <= 6; j++) {
        for (var i = 0; i < b.bone.pinIndex.length; i++) {
            if (b.bone.pinIndex[i].name == 'AIN' + j) {
                ain[j] = b.bone.pinIndex[i].key;
            }
        }
    };

    var index = 1;
    doRead();

    function doRead() {
        b.analogRead(ain[index], onRead);
    }

    function onRead(x) {
        try {
            brightness = Math.abs((x.value - 1)*100);
            display = ((x.value - 0.15))*100  ;
            sensor_reading =display.toFixed(5)
            // console.log(sensor_reading);
            $('#ain1').html(sensor_reading);
            $("#brightness").html(brightness);
        } catch (ex) {
            $('#ain' + index).html('XXXXX');
        }
        // index++;
        if (index > 6) {
            index = 0;
            setTimeout(doRead, 1000);
        } else {
            doRead();
        }
    }
}