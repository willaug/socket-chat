const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 8080
const url = `http://127.0.0.1:${port}/`

app.set('view engine', 'ejs')
app.use(express.static('public'))

let users = 0
let usernames = []

io.on("connection", socket => {
    
    //init
    socket.on("init", username => {
        let findName = usernames.find(name => name == username)
        let res

        if(findName == undefined)
            res = true
        else
            res = false

        socket.emit('nameIsValid', res)

    });
    
    //new user
    socket.on('newUser', username => {
        socket.username = username
        usernames.push(username)
        ++users
        io.emit('participants', { username, users })
    })

    //send message
    socket.on('message', data => {
        io.emit('showMessage', {body: data.body, username: data.username})
    })

    //disconnect
    socket.on('disconnect', () => {
        if(socket.username != '' && socket.username != undefined){
            let index = usernames.indexOf(socket.username)
            usernames.splice(index, 1)

            --users
            io.emit('userLeft', { username: socket.username, users })
        }
    })

})

app.get('/', (req, res) => {
    res.render('index', { url })
})

server.listen(port, () => console.log(`Server running on port ${port}`))