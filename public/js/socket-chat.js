var socket = io();
let params = new URLSearchParams(window.location.search);
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('nombre requerido');
}
let nombre = params.get('nombre');
let sala = params.get('sala');
document.getElementById("salasmall").innerHTML = sala;

socket.on('connect', function() {
    socket.emit('entrarChat', {
        nombre: nombre,
        sala: sala
    }, function(resp) {
        console.log(resp);
        renderUsuarios(resp);
    })
})



// mensaje privado

socket.on('private', function(data) {
    console.log(data);
});

socket.on('listachat', function(data) {
    console.log(data);
    renderUsuarios(data);
})





socket.on('disconnect', function() {
    console.log('se perdio conexion con el servidor');
})

socket.on('crearM', function(resp) {
    console.log(resp);
    renderMessages(resp, false);
    scrollBottom();
})