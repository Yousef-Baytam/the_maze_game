document.addEventListener('DOMContentLoaded', () => {
    const boundaries = document.querySelectorAll('.boundary')
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')
    const status = document.querySelector('#status')

    let losing = () => {
        status.innerText = 'You Lost'
        status.style.color = 'red'
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = 'red'
        }
    }

    let winning = () => {
        status.innerText = 'You Won'
        status.style.color = 'Green'
        for (let boundary of boundaries) {
            boundary.removeEventListener('pointerover', losing, { once: true })
        }
    }

})

