const game = () => {
    const boundaries = document.querySelectorAll('.boundary:not(.example)')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')
    const outBoundary = document.querySelector('#game')
    const scoreDisplay = document.createElement('h2')
    let score = 0

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
    }

    outBoundary.insertAdjacentElement('afterend', scoreDisplay)
    start.addEventListener('mouseover', startGame)
    start.addEventListener('click', gameReset)
    UpdateScore()
}

document.addEventListener('DOMContentLoaded', game)