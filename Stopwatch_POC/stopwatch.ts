let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval: number | undefined;
let running = false;
let lapCount = 0;

const display = document.getElementById('display') as HTMLDivElement;
const startStopButton = document.getElementById('startStop') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const lapButton = document.getElementById('lap') as HTMLButtonElement;
const laps = document.getElementById('laps') as HTMLUListElement;

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (running) {
        clearInterval(interval);
        running = false;
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('stop');
        startStopButton.classList.add('start');
    } else {
        startTime = Date.now() - difference;
        interval = window.setInterval(updateDisplay, 10);
        running = true;
        startStopButton.textContent = 'Stop';
        startStopButton.classList.remove('start');
        startStopButton.classList.add('stop');
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    startStopButton.textContent = 'Start';
    startStopButton.classList.remove('stop');
    startStopButton.classList.add('start');
    difference = 0;
    display.textContent = '00:00:00.00';
    laps.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
        laps.appendChild(lapTime);
        // Scroll to bottom of laps list
        laps.scrollTop = laps.scrollHeight;
    }
}

function updateDisplay() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number: number, digits: number = 2): string {
    return number.toString().padStart(digits, '0');
}
