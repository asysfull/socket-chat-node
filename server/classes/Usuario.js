class Usuario {
    constructor() {
        this.personas = [];
    }

    addPerson(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }
    getPerson(id) {
        let person = this.personas.filter(p => p.id === id)[0];
        return person;
    }
    getPersonAll() {
        return this.personas;
    }

    getPersonSala(sala) {
        let personsala = this.personas.filter(p => p.sala === sala);
        return personsala;
    }

    deletePerson(id) {
        let personborrada = this.getPerson(id);
        this.personas = this.personas.filter(p => p.id != id);
        return personborrada;
    }

}



module.exports = {
    Usuario
}