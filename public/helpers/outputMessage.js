const messages = document.querySelector('.chat-messages')

export const outputMessage = (data) => {
    let div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${data.username} <span>${data.time}</span></p>
    <p class="text">
     ${data.message}
    </p>`
    messages.appendChild(div)
    messages.scrollTo(0, messages.scrollHeight)
}
