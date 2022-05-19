const game = () => {
    const boundaries = document.querySelectorAll('.boundary')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')
    const box = document.querySelector('.example')
    let score = 0

    let endEventlisteners = () => {
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing)
        }
        end.removeEventListener('pointerover', winning)
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

    start.addEventListener('click', () => {
        for (let boundary of boundaries) {
            boundary.addEventListener('pointerover', losing, { once: true })
            end.addEventListener('pointerover', winning, { once: true })
        }
        status.innerText = `current score is ${ score }`
        status.style.color = 'black'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'rgb(238, 238, 238)'
        }
    })
}

document.addEventListener('DOMContentLoaded', game)
