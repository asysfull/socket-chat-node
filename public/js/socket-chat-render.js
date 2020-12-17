let params2 = new URLSearchParams(window.location.search);

let divuser = document.getElementById("divUsuarios");
let sendMessage = document.getElementById("sendMessage");
let message = document.getElementById("txtMessage");
let divMessages = $("#divChatbox");
// render usuarios
function renderUsuarios(data) {
    console.log(data);
    let html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)"  class="active"> Chat de <span>' + params2.get('sala') + '</span></a>';
    html += '</li>';


    for (let i = 0; i < data.length; i++) {
        html += '<li>';
        html += '<a data-id="' + data[i].id + '" href="javascript:void(0)" onclick="obtenerId(this)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> ';
        html += '<span>' + data[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divuser.innerHTML = html;
}

function obtenerId(e) {
    let id = e.getAttribute('data-id');
    console.log(id);
}


sendMessage.addEventListener('submit', (e) => {
    e.preventDefault();


    socket.emit('crearM', {
        message: message.value
    }, function(resp) {
        message.value = '';
        renderMessages(resp, true);
        scrollBottom();
    });



})


function renderMessages(message, yo) {
    let html = '';
    let fecha = new Date(message.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();
    let classadmin = 'danger';
    if (message.modo) {
        classadmin = 'success';
    }

    if (yo) {
        html += ' <li class="reverse">';
        html += ' <div class="chat-content">';
        html += '<h5>' + message.nombre + '</h5>';
        html += ' <div class="box bg-light-inverse">' + message.mensaje + '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div></div > ';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li> ';
    } else {
        html += '<li class="animated fadeIn">';
        if (message.nombre != 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
            classadmin = 'info';
        }
        html += '<div class="chat-content">';
        html += '<h5>' + message.nombre + '</h5>';
        html += '<div class="box bg-light-' + classadmin + '">' + message.mensaje + '</div></div>';

        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }




    divMessages.append(html);
}


function scrollBottom() {

    // selectors
    var newMessage = divMessages.children('li:last-child');

    // heights
    var clientHeight = divMessages.prop('clientHeight');
    var scrollTop = divMessages.prop('scrollTop');
    var scrollHeight = divMessages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divMessages.scrollTop(scrollHeight);
    }
}