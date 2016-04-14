var Persona = function(nombre, edad) {  
  this.nombre = nombre;
  this.edad = edad;

  var self = this;

  return {
    saludar: function() {
      alert("Hola, mi nombre es " + self.nombre);
    },
    presentar: function() {
      alert("Tengo " + self.edad + " a�os.");
    }
  };
}

module.exports = Persona;  