const game = () => {
    const boundaries = document.querySelectorAll('.boundary:not(.example)')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')
    const outBoundary = document.querySelector('#game')
    const reset = document.createElement('button')
    const scoreDisplay = document.createElement('h2')
    let score = 0

    let endEventlisteners = () => {
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing)
        }
        end.removeEventListener('pointerover', winning)
        outBoundary.removeEventListener('mouseleave', cheating)
    }

    let losing = () => {
        score -= 10
        status.innerText = `You lost, your score is ${ score }`
        status.style.color = 'red'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'red'
        }
        endEventlisteners()
    }

    let winning = () => {
        score += 5
        status.innerText = `You won, your score is ${ score }`
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
        status.innerText = `Begin by moving your mouse over the "S".`
        status.style.color = 'black'
        endEventlisteners()
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'rgb(238, 238, 238)'
        }
    }

    start.addEventListener('mouseover', () => {
        for (let boundary of boundaries) {
            boundary.addEventListener('pointerover', losing, { once: true })
            end.addEventListener('pointerover', winning, { once: true })
        }

        status.innerText = `current score is ${ score }`
        status.style.color = 'black'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'rgb(238, 238, 238)'
        }
        outBoundary.addEventListener('mouseleave', cheating)
    })
    reset.style.margin = '0 0 0 60%'
    reset.style.width = '100px'
    reset.style.height = '5vh'
    reset.innerText = 'Reset'
    reset.style.backgroundColor = 'red'
    reset.style.color = 'White'
    reset.style.borderRadius = '10px'
    document.body.appendChild(reset)
    reset.addEventListener('click', gameReset)
}

document.addEventListener('DOMContentLoaded', game)