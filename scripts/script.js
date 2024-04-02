function createCar() {
    var car = document.createElement('div');
    car.className = 'car horizontal';
    car.style.top = '480px';
    car.style.left = '0px';
    document.querySelector('.road').appendChild(car);
    setTimeout(function () {
        car.style.left = '280px';
    }, 100);
    setTimeout(function () {
        car.className = 'car vertical';
    }, 2100);
    setTimeout(function () {
        car.style.top = '750px';
    }, 2200);
}

function createCarStraight() {
    var car = document.createElement('div');
    car.className = 'car horizontal';
    car.style.top = '480px';
    car.style.left = '0px';
    document.querySelector('.road').appendChild(car);

    var light = document.querySelectorAll('.trafficLight1 .light');
    var stopLine = 140; // Позиция стоп-линии
    var trafficLightDistance1 = 50;
    var trafficLightDistance2 = 100;

    let redLight = null;
    let yellowLight = null;
    let greenLight = null;
    for (let i = 0; i < light.length; i++) {
        if (light[i].className == "light red") {
            redLight = light[i];
        } else if (light[i].className == "light yellow") {
            yellowLight = light[i];
        } else if (light[i].className == "light green") {
            greenLight = light[i];
        }
    }

    setInterval(function () {

        var currentColor = redLight.style.backgroundColor;
        car.style.left = trafficLightDistance1 + 'px';

        if (document.getElementById('trafficLightSwitch').checked) {
            if (redLight.style.backgroundColor === 'red') {
                // Красный свет: остановка перед стоп-линией
                car.style.left = stopLine + 'px';
            } else if (yellowLight.style.backgroundColor === 'yellow') {
                // Желтый свет: замедление и остановка перед стоп-линией
                car.style.left = stopLine + 'px';
            } else if (greenLight.style.backgroundColor === 'green') {
                // Зеленый свет: проезд перекрестка прямо
                car.className = 'car vertical';
                car.style.left = '750px';
            }
        } else {
            // Перекресток нерегулируемый: проезд перекрестка прямо
            car.className = 'car vertical';
            car.style.top = '750px';
        }
    }, 1000);
}

/**/
// Define the traffic light modes
const modes = [
    "Yellow Blinking",  // Mode 1
    "Red",              // Mode 2
    "Red and Yellow",   // Mode 3
    "Green",            // Mode 4
    "Green Blinking",   // Mode 5
    "Yellow"            // Mode 6
];

// Initialize the intersection mode (1: unregulated, 2-6: regulated)
let intersectionMode = 1;

// Initialize the traffic light modes for all lights
let trafficLightModes = [1, 1, 1, 1];

// Define the switching order for each intersection mode
const switchingOrder = {
    1: [1, 1, 1, 1],  // Unregulated
    2: [4, 2, 4, 2],  // Road A allowed
    3: [5, 2, 5, 2],  // Road A warning
    4: [6, 3, 6, 3],  // Road A stop, Road B warning
    5: [2, 4, 2, 4],  // Road B allowed
    6: [2, 5, 2, 5],   // Road B warning
    7: [3, 6, 3, 6]  // Road A stop, Road B warning
};

let order = switchingOrder[intersectionMode];

// Function to switch traffic light modes
function switchTrafficLights(newMode, newTimeOut) {
    // Get the switching order for the current intersection mode
    /*if (!document.getElementById('trafficLightSwitch').checked) {
        intersectionMode = 1;
    } else if (intersectionMode == 1) { intersectionMode = intersectionMode + 1; }
*/
    order = switchingOrder[intersectionMode];

    // Update the traffic light modes
    for (let i = 0; i < trafficLightModes.length; i++) {
        trafficLightModes[i] = order[i];
    }

    // Print the current modes
    console.log(`Intersection Mode ${intersectionMode}:`);
    for (let i = 0; i < trafficLightModes.length; i++) {
        console.log(`Traffic Light ${i + 1}: ${modes[trafficLightModes[i] - 1]}`);
        let varMode = `${modes[trafficLightModes[i] - 1]}`;
        let varLightId = `${i + 1}`;
        switchLightsFor(varLightId, varMode, newTimeOut);

    }

    // Update the intersection mode (cyclically)
    //intersectionMode = (intersectionMode % 7) + 1;



}

function switchLightsFor(varTrafficLight, mode, timeOut) {
    const light = document.querySelectorAll('.trafficLight' + varTrafficLight + ' .light');
    let blinkingInterval = null;
    //clearInterval(blinkingInterval);
    let redLight = null;
    let yellowLight = null;
    let greenLight = null;
    for (let i = 0; i < light.length; i++) {
        if (light[i].className == "light red") {
            redLight = light[i];
        } else if (light[i].className == "light yellow") {
            yellowLight = light[i];
        } else if (light[i].className == "light green") {
            greenLight = light[i];
        }
    }

    if (mode == "Yellow Blinking") {
        // Green blinking
        redLight.style.backgroundColor = 'gray';
        yellowLight.style.backgroundColor = 'yellow';
        greenLight.style.backgroundColor = 'gray';

        for (let i = 0; i < timeOut / 1000; i++) {
            setTimeout(() => {
                yellowLight.style.backgroundColor = 'gray';
                setTimeout(() => {
                    yellowLight.style.backgroundColor = 'yellow';
                }, 500);
            }, 500);
        }
    } else if (mode == "Red") {
        // Red
        redLight.style.backgroundColor = 'red';
        yellowLight.style.backgroundColor = 'gray';
        greenLight.style.backgroundColor = 'gray';
    } else if (mode == "Red and Yellow") {
        // Red and Yellow
        redLight.style.backgroundColor = 'red';
        yellowLight.style.backgroundColor = 'yellow';
        greenLight.style.backgroundColor = 'gray';
    } else if (mode == "Green") {
        // Green
        redLight.style.backgroundColor = 'gray';
        yellowLight.style.backgroundColor = 'gray';
        greenLight.style.backgroundColor = 'green';
    } else if (mode == "Green Blinking") {
        // Green blinking
        redLight.style.backgroundColor = 'gray';
        yellowLight.style.backgroundColor = 'gray';
        greenLight.style.backgroundColor = 'green';
        for (let i = 0; i < timeOut / 1000; i++) {
            setTimeout(() => {
                greenLight.style.backgroundColor = 'gray';
                setTimeout(() => {
                    greenLight.style.backgroundColor = 'green';
                }, 500);
            }, 500);
        }
    } else if (mode == "Yellow") {
        // Yellow
        redLight.style.backgroundColor = 'gray';
        yellowLight.style.backgroundColor = 'yellow';
        greenLight.style.backgroundColor = 'gray';
    }
}

function blinkingLight(light, stokColor) {
    setTimeout(() => {
        light.style.backgroundColor = 'grey';
    }, 500);
    setTimeout(() => {
        light.style.backgroundColor = stokColor;
    }, 500);
}

let timerMode =0;
let timerMain = 0;
let timerRoadA = 20;
let timerRoadB = 15;
let timerBlinkingGreen = 5;
let timerYellow = 3;
let timerSwitchMode = 5;

let timer1 = document.getElementById('timer1');
let timer2 = document.getElementById('timer2');
let timer3 = document.getElementById('timer3');
let timer4 = document.getElementById('timer4');

setInterval(function () {

    if (!document.getElementById('trafficLightSwitch').checked) {
        intersectionMode = 1;
        switchTrafficLights(3, 2000);
    } else if (intersectionMode == 1) { ++intersectionMode; }


    if (intersectionMode != 1) {
        timer1.textContent = timerMain;
        timer2.textContent = timerMain;
        timer3.textContent = timerMain;
        timer4.textContent = timerMain;

        if (timerMode <= 0) {
            switch (intersectionMode) {
                case 2:
                    //swithing light to Mode 3: Blinking Green
                    intersectionMode = 3;
                    timerMode = timerBlinkingGreen;
                    switchTrafficLights(3, timerMode*1000);
                    break;
                case 3:
                    //swithing light to Mode 4: Yellow
                    intersectionMode = 4;
                    timerMode = timerYellow;
                    switchTrafficLights(4, timerMode*1000);
                    break;
                case 4:
                    //swithing light to Mode 5
                    intersectionMode = 5;
                    timerMode = timerRoadB
                    timerMain = timerRoadB+timerBlinkingGreen;
                    switchTrafficLights(5, timerMode*1000);
                    break;
                case 5:
                    //swithing light to Mode 6
                    intersectionMode = 6;
                    timerMode = timerBlinkingGreen;
                    switchTrafficLights(6, timerMode*1000);
                    break;
                case 6:
                    //swithing light to Mode 7
                    intersectionMode = 7;
                    timerMode = timerYellow;
                    switchTrafficLights(7, timerMode*1000);
                    break;
                case 7:
                    //swithing light to Mode 2
                    intersectionMode = 2;
                    timerMode=timerRoadA;
                    timerMain = timerRoadA+timerBlinkingGreen;
                    switchTrafficLights(5, timerMode*1000);
                    break;

            }
        }
        --timerMode;
        --timerMain;
    }
}, 1000);




/**/

/*
 
var lights = document.querySelectorAll('.trafficLight1 .light');
var colors = ['red', 'yellow', 'green'];
var currentColor = 0;
 
setInterval(function() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].style.backgroundColor = colors[currentColor];
  }
  currentColor = (currentColor + 1) % colors.length;
}, 1000);
*/