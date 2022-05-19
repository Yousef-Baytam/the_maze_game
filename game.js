document.addEventListener('DOMContentLoaded', () => {
    const boundaries = document.querySelectorAll('.boundary')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')
    let score = 0

    let losing = () => {
        score -= 10
        status.innerText = `You lost, your score is ${ score }`
        status.style.color = 'red'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'red'
        }
    }

    let winning = () => {
        score += 5
        status.innerText = `You won, your score is ${ score }`
        status.style.color = 'Green'
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing, { once: true })
        }
    }

    let reset = () => {
        score = 0
        status.innerText = `current score is ${ score }`
        status.style.color = 'black'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'rgb(238, 238, 238)'
        }
    }

    start.addEventListener('pointerover', () => {
        for (let boundary of boundaries) {
            boundary.addEventListener('pointerover', losing, { once: true })
            end.addEventListener('pointerover', winning, { once: true })
        }
    }, { once: true })

    start.addEventListener('click', reset)
})

