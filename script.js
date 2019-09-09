const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageinput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

// Create and emits a user.
var name;
const alert = alertify.prompt( 'What is your name?', ''
, function(evt, value) { 
    this.name = value;
    alertify.success('Your name is: ' + value);
    appendAnnouncement('You joined');
    socket.emit('new-user', value);
    console.log(this.name);
}, function() { 
    window.location.reload(false); 
}).setting({
    'label': 'Choose your name',
    'modal': true,
    'header': 'Choose your name'
}).setHeader('Choose your name').value;


socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendAnnouncement(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendAnnouncement(`${name} disconnected`)
})

messageForm.addEventListener('submit', e=> {
    e.preventDefault()
    const message = messageinput.value
    socket.emit('send-chat-message', message)

    // Write join message
    appendMessage(`You: ${message}`, true)

    // Reset message box
    messageinput.value = ''
})

function appendMessage(message, you) {
    // creating message container
    const messageElement = document.createElement('div')
    if (you == true){
        messageElement.className = "message-you"
    }else{
        messageElement.className = "message"
    }

    
    // creating message content.
    const messageContent = document.createElement('div')
    messageContent.className = "message-content"

    // making content child of container.
    messageElement.appendChild(messageContent)

    // Adding message in content.
    messageContent.innerText = message
    messageContainer.append(messageElement)
}

function appendAnnouncement(message) {
    const messageElement = document.createElement('div')
    messageElement.className = "message-annoucement"

    // creating message content.
    const messageContent = document.createElement('div')
    messageContent.className = "message-content"

    // making content child of container.
    messageElement.appendChild(messageContent)

    // Adding message in content.
    messageContent.innerText = message
    messageContainer.append(messageElement)
}
