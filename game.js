const game = () => {
    const boundaries = document.querySelectorAll('.boundary:not(.example)')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')
    const outBoundary = document.querySelector('#game')
    const scoreDisplay = document.createElement('h2')
    const timeStat = document.createElement('h2')
    const liveTime = document.createElement('h2')
    const lastTime = document.createElement('h2')
    const bestTime = document.createElement('h2')
    const timersWrapper = document.createElement('div')
    let score = 0
    let liveT = '0:0:0'
    let bestT = '0:0:0'
    let lastT = '0:0:0'
    let timer


    const UpdateScore = (num = 0) => {
        score += num
        scoreDisplay.innerText = `Your score is: ${ score }`
    }

    let endEventlisteners = () => {
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing)
        }
        end.removeEventListener('pointerover', winning)
        outBoundary.removeEventListener('mouseleave', cheating)
        clearInterval(timer)
    }

    let losing = () => {
        UpdateScore(-10)
        status.innerText = `You Lost!`
        status.style.color = 'red'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'red'
        }
        endEventlisteners()
    }

    let winning = () => {
        UpdateScore(5)
        status.innerText = `You Won!`
        status.style.color = 'Green'
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing, { once: true })
        }
        endEventlisteners()
    }

    let cheating = () => {
        endEventlisteners()
        status.innerText = `You lost, you tried to cheat`
        status.style.color = 'red'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'red'
        }
    }

    const gameReset = () => {
        score = 0
        UpdateScore()
        status.innerText = `Begin by moving your mouse over the "S".`
        status.style.color = 'black'
        endEventlisteners()
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'rgb(238, 238, 238)'
        }
    }

    startGame = () => {
        for (let boundary of boundaries) {
            boundary.addEventListener('pointerover', losing, { once: true })
            end.addEventListener('pointerover', winning, { once: true })
        }

        status.innerText = `Game On!`
        status.style.color = 'black'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'rgb(238, 238, 238)'
        }
        outBoundary.addEventListener('mouseleave', cheating)
        StartTimer()
    }

    const StartTimer = () => {
        let msec = 0
        let sec = 0
        let min = 0
        timer = setInterval(() => {
            if (msec !== 9) {
                msec += 1
            } else if (sec !== 59) {
                sec += 1
                msec = 0
            } else {
                min += 1
                sec = 0
                msec = 0
            }
            liveT = `${ min }:${ sec }:${ msec }`
            liveTime.innerHTML = `<div>Live</div><div>${ liveT }</div>`
        }, 100)
    }

    timeStat.innerText = 'Time Stats'
    liveTime.innerHTML = `<div>Live</div><div>${ liveT }</div>`
    lastTime.innerHTML = `<div>Last</div><div>${ lastT }</div>`
    bestTime.innerHTML = `<div>Best</div><div>${ bestT }</div>`
    timersWrapper.appendChild(liveTime)
    timersWrapper.appendChild(lastTime)
    timersWrapper.appendChild(bestTime)
    outBoundary.insertAdjacentElement('afterend', timersWrapper)
    outBoundary.insertAdjacentElement('afterend', timeStat)
    outBoundary.insertAdjacentElement('afterend', scoreDisplay)
    timersWrapper.style.display = 'flex'
    timersWrapper.style.justifyContent = 'space-evenly'
    timersWrapper.style.width = '50%'
    timersWrapper.style.marginLeft = '25%'
    start.addEventListener('mouseover', startGame)
    start.addEventListener('click', gameReset)
    UpdateScore()
}

document.addEventListener('DOMContentLoaded', game)