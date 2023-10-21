import { outputMessage } from "../helpers/outputMessage.js"
const chatForm = document.querySelector('#chat-form')
const usersDiv = document.querySelector('#users')
const socket = io()

const urlSearchParams = new URLSearchParams(window.location.search)
const username = urlSearchParams.get('username')
const room = urlSearchParams.get('room')
let data = { username, room }

socket.on('connect', () => {
  socket.emit('joinChat', data)
})


socket.on('message', (data) => {
  outputMessage(data)
})

socket.on('roomUsers', ({ room, users }) => {
  usersDiv.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}
`
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let message = e.target.elements.message.value
  socket.emit('message', message)
  e.target.elements.message.value = ''
  e.target.elements.message.focus()
})
