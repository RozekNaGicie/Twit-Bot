var Gpio = require('onoff').Gpio, 
  led = new Gpio(4, 'out');
var iv = setInterval(function () { 
  led.writeSync(led.readSync() === 0 ? 1 : 0)
}, 500);
// Przełączaj stan diody co pół sekundy.
setTimeout(function () {
  clearInterval(iv);
  led.writeSync(0); 
  // Wyłącz diodę.
  led.unexport();
}, 2000); 
