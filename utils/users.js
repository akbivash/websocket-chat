let users = []

 const joinChat = (id,username,room) => {
    const user = {id,username, room}
    users.push(user)
    return user 
}

const leaveChat = (id) => {
  let filteredUsers = users.filter(user => user.id !== id)
   users = filteredUsers 
   return users
}

const getRoomUsers = (room) => {
    return users.filter(user => user.room === room)
}

const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}

module.exports = {getCurrentUser, joinChat, leaveChat, getRoomUsers}