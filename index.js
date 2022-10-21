const StartBtn = document.querySelector('.startBtn')
const mainStartBtn = document.querySelector('.mainStartBtn')

const lapResetBtn = document.querySelector('.lapResetBtn')
const mainLapBtn = document.querySelector('.mainLapBtn')

const laps = document.querySelector('.laps')

let min = 0
let sec = 0
let milisec = 0

let m = 0
let s = 0
let ms = 0

let time = document.querySelector('.time')


let allLaps = []
let lapsNumber = 1

let int = null
let isTimerStarted = false

StartBtn.addEventListener('click', () => {
    if(!isTimerStarted) {
        int = setInterval(displayTimer,10)
    } else {
        clearInterval(int)
    }
    changeStartBtn()
    checkIsResetAvailable()
})

function displayLaps() {
    lapsNumber++
    laps.innerHTML = ""
    if(allLaps.length > 0) {
        allLaps.map(item => {
            laps.innerHTML += `
                <div class="lap">
                    <span>Lap ${item.number}</span>
                    <span>${item.time}</span>
                </div>
            `
        })
    }
}
lapResetBtn.addEventListener('click', () =>{
    if(!isTimerStarted) { //Reset click
        min = 0
        sec = 0
        milisec = 0

        m = 0
        s = 0
        ms = 0

        time.innerHTML = "00:00,00"
    } else {//Lap click
        allLaps.push({
            time: `${m}:${s},${ms}`,
            number: lapsNumber,
        })
        displayLaps()
    }
})

function displayTimer() {
    milisec++
    if(milisec >= 99) {
        sec++;
        milisec = 0
    }
    if(sec >= 60) {
        min++
        sec = 0
    }
    m = min < 10 ? "0" + min : min
    s = sec < 10 ? "0" + sec : sec
    ms = milisec < 10 ? "0" + milisec : milisec
    time.innerHTML = `${m}:${s},${ms}`
}

function changeStartBtn() {
    if(!isTimerStarted) {
        isTimerStarted = true
        StartBtn.innerHTML = 'Stop'
        StartBtn.classList.add('timerStarted')
        mainStartBtn.classList.add('timerStartedMain')
    } else{
        isTimerStarted = false
        StartBtn.innerHTML = 'Start'
        StartBtn.classList.remove('timerStarted')
        mainStartBtn.classList.remove('timerStartedMain')
    }
}

function checkIsResetAvailable() {
    if(!isTimerStarted) {
        lapResetBtn.innerHTML = 'Reset'
    } else{
        lapResetBtn.innerHTML = 'Lap'
    }
}