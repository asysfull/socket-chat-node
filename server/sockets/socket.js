const { Usuario } = require('../classes/Usuario');
const usuarios = new Usuario();

const { crearMensaje } = require('../utils/utils');

module.exports.SocketDev = (io) => {

    io.on('connection', (client) => {

        client.on('entrarChat', (data, callback) => {
            console.log(data);
            let persons = usuarios.addPerson(client.id, data.nombre, data.sala);
            client.join(data.sala);

            client.broadcast.to(data.sala).emit('listachat', usuarios.getPersonSala(data.sala));

            client.broadcast.to(data.sala).emit('crearM', {
                nombre: 'Administrador',
                mensaje: `el usuario ${data.nombre} se unión a la sala`,
                fecha: new Date().getTime(),
                modo: 'in'
            });

            callback(usuarios.getPersonSala(data.sala));
        });

        // crear m
        client.on('crearM', (data, callback) => {
            console.log(data);
            let usuario = usuarios.getPerson(client.id);
            let dts = crearMensaje(usuario.nombre, data.message);
            client.broadcast.to(usuario.sala).emit('crearM', dts);
            callback(dts);
        });

        // mensaje privado

        client.on('private', (data) => {
            let usuario = usuarios.getPerson(client.id);
            client.broadcast.to(data.para).emit('private', crearMensaje(usuario.nombre, data.message));

        })

        client.on('disconnect', () => {
            let usuarioBorrads = usuarios.deletePerson(client.id);

            client.broadcast.to(usuarioBorrads.sala).emit('crearM', {
                nombre: 'Administrador',
                mensaje: `el usuario ${usuarioBorrads.nombre} abandono el chat`,
                fecha: new Date().getTime()
            });
            client.broadcast.to(usuarioBorrads.sala).emit('listachat', usuarios.getPersonSala(usuarioBorrads.sala));
        })


    })
}