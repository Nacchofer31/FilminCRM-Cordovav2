// inicializacion de la app
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      // añadir los eventos a los iconos flotantes

        createDB.initialize(); // comprobacion DDBB

        console.log('Received Event: ' + id);
    }
};
//control de creacion de la bbdd
var createDB = {
  db:"",
  initialize:function() {
    // comprobar si existe la base de datos
    var existDB;
    existDB = window.localStorage.getItem("exist_db");
    this.db = window.openDatabase("crmDB", "1.0", "Filmin'CRM", 2*(1024*1024));
    if (existDB == null || existDB == false) {
      console.log("No existe la BBDD");
      this.createDB();
      useDB.initialize();
    }
    else {
      useDB.initialize();
    }
  },

  createDB:function() {
    this.db.transaction(this.dbCreate, this.dbError, this.dbOk);
  },

  dbCreate:function(tx) {
    var persona = "CREATE TABLE IF NOT EXISTS persona (idpersona INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR(32) NOT NULL, apellidos VARCHAR(128) NOT NULL, edad INTEGER NOT NULL, "+
    "ciudad VARCHAR(64) NOT NULL, email VARCHAR(64) NOT NULL);";
    tx.executeSql(persona);
    console.log("tabla persona creada");

    var insert = "INSERT INTO persona(nombre, apellidos, edad, ciudad, email) VALUES('Cristoph', 'Waltz', 58, 'Viena', 'Waltz@gmail.com');";
    tx.executeSql(insert);
    console.log("Cristoph insertado");
    window.localStorage.setItem("exist_db", true);
  },

  dbError:function(e) {
    console.log("Error al crear BBDD: "+ e.code);
    window.localStorage.setItem("exist_db", false);
  },

  dbOk:function() {
    console.log("BBDD creada correctamente!");
    window.localStorage.setItem("exist_db", true);
  }
};
// recuperacion e insercion de datos
var useDB = {
  db:"",
  initialize: function() {
    this.db = window.openDatabase("crmDB", "1.0", "miniCRM Database", 2*(1024*1024));
  },

  consultaDatos: function(id) {
    this.db.transaction(function(id){
      //consulta persona por id
    }, this.dbLoadError);
  }

  dbLoadError:function(e) {
    console.log("Error al cargar la BBDD: "+e.code);
  }
}

app.initialize();
