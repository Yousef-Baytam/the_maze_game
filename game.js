document.addEventListener('DOMContentLoaded', () => {
    const boundaries = document.querySelectorAll('.boundary')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')
    const score = 0

    let losing = () => {
        status.innerText = 'You Lost'
        status.style.color = 'red'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'red'
        }
        score -= 10
    }

    let winning = () => {
        status.innerText = 'You Won'
        status.style.color = 'Green'
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing, { once: true })
        }
        score += 5
    }

    start.addEventListener('pointerover', () => {
        for (let boundary of boundaries) {
            boundary.addEventListener('pointerover', losing, { once: true })
            end.addEventListener('pointerover', winning, { once: true })
        }
    }, { once: true })

})

