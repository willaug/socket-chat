//init
let username

document.querySelector('#btn_start').addEventListener('click', () => defineName())
document.querySelector('#nameInput').addEventListener('keypress', e => {
    if(e.key == 'Enter')
        addName()
})

//start
function defineName(){
    setTimeout(() => {
        document.querySelector('#title').textContent = 'Falta pouco...'
        document.querySelector('#btn_start').style.display = 'none'
        
        let nameInput = document.querySelector('#nameInput')
        nameInput.style.display = 'block'
        nameInput.classList.add('animate__animated','animate__fadeIn')
        nameInput.focus()
    }, 100)
}

//set error
function setError(text){
    let error = document.querySelector('.error')
    error.style.display = 'block'
    error.style.opacity = 1

    error.innerHTML = text

    setTimeout(() => {
        error.style.opacity = 0
    }, 4000)
}

//set name
async function addName(){
    let nameValue = document.querySelector('#nameInput').value
    let addUsername

    if(nameValue == '' || nameValue == ' ' || nameValue[0] == ' '){
        return setError('O nome é requerido!')
    }

    username = (nameValue[0].toUpperCase() + nameValue.slice(1)).replace(/  +/g, ' ')
    socket.emit('init', username)

    await new Promise( resolve => {
        socket.on('nameIsValid', res => resolve(addUsername = res) )
    })

    if(!addUsername){
        return setError('Há um usuário com o mesmo nome!')
    }
    
    document.querySelector('#startSection').style.display = 'none'
    document.querySelector('.author').style.display = 'none'
    
    socket.emit('newUser', username)
    chatSection()
    
    document.querySelector('#nameInput').value = ''
}

//log
function small(nameSocket, body){
    socket.on(nameSocket, data => {
        let chat = document.querySelector('.messages')
        let small = document.createElement('small')

        document.querySelector('.count').textContent = data.users

        if(data.username == username)
            data.username = 'Você'

        small.innerText = data.username + body

        chat.appendChild(small)
        window.scrollTo(0,document.body.scrollHeight);
    })
}

//connected
function userConnected(){
    small('participants', ' se conectou a conversa')
}

//show chat
function chatSection(){
    document.querySelector('.count').style.display = 'block'
    document.querySelector('#btn_emoticons').addEventListener('click', () => toggleEmoticons())
    document.querySelector('#btn_send').addEventListener('click', () => sendMessage())
    document.querySelector('#textInput').addEventListener('keypress', e => {
        if(e.keyCode === 13){
            e.preventDefault()
            sendMessage()
        }
    })

    let section = document.querySelector('#chatSection')
    section.style.display = 'block'
    section.classList.add('animate__animated','animate__fadeIn')

    showMessage()
    addEmoticon()
    showDisconnected()
    userConnected()
}

//chat functions
function toggleEmoticons(){
    document.querySelector('#btn_emoticons').classList.toggle('icon-button-selected')
    document.querySelector('#list_emoticons').classList.toggle('show-emoticons')
}

function addEmoticon(){
    let icon = document.querySelectorAll('#list_emoticons p')
    let textInput = document.querySelector('#textInput')

    for(i = 0; i < icon.length; i++){
        let iconSelected = icon[i]

        iconSelected.addEventListener('click', () => {
            textInput.value += iconSelected.textContent
            textInput.focus()
        })
    }
}

//message
function sendMessage(){
    let textInput = document.querySelector('#textInput')
    let body = textInput.value

    if(body != '' && body[0] != ' '){
        socket.emit('message', { body })
    }

    textInput.value = ''
    textInput.value.replace('/\n/g', '')
    textInput.focus()
}

//show messages
function showMessage(){
    let chat = document.querySelector('.messages')

    socket.on('showMessage', data => {
        let message = document.createElement('div')
        let author = document.createElement('p')
        let bodyMessage = document.createElement('p')

        message.classList.add('message')
        author.classList.add('author-message')
        bodyMessage.classList.add('message-text')

        if(data.username == username){
            message.classList.add('you')
            author.innerText = 'Você'
        }else{
            author.innerText = data.username
        }

        bodyMessage.innerText = data.body

        message.appendChild(author)
        message.appendChild(bodyMessage)

        chat.appendChild(message)
        window.scrollTo(0,document.body.scrollHeight);
    })
}

//disconnected
function showDisconnected(){
    small('userLeft', ' se desconectou da conversa')
}