const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const PORT = process.env.PORT || 5001

const router = require('./router')
const { addUser, removeUser, getUser, getUserInRoom } = require('./user')

corsOptions = {
    cors: true,
    origins: ['https://chatify-nafi.herokuapp.com/'] //To prevent CORS errors updated in 2021 by Nafi Mahmud
}

const app = express()
const server = http.createServer(app)
const io = socketio(server, corsOptions)

app.use(router)

io.on('connection', (socket) => {
    console.log('Hurray! We have a new connection')

    socket.on('join', ({ name, room }, callback) => {  //Admin generated message
        console.log('User has logged in')
        console.log(`Name: ${name}, Room: ${room}`)

        const { error, user } = addUser({ id: socket.id, name, room })

        if(error) return callback(error)

        socket.join(user.room)

        socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has just joined. Cheer up! ${user.room}`})

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

        callback()

    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })

        callback()
    })

    socket.on('disconnect', () => {
        console.log('User has left')

        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        }

    })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
