/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var confBD = {
  var existe_db="";
  db="";
  initialize: function(){
    this.existe_db=window.localStorage.getItem("existe_db");
    this.db=window.openDatabase("localDB","1.0","Base de datos",3*1024*1024);
    if(existe_db==null){
      console.log("No existe la Base de datos");
      this.createDB();
    }else{
      navigator.notification.alert(
          'Tienes una base de datos creada!',  // message
          this.alertDismissed,         // callback
          'Good Job!',            // title
          'OK!'                  // buttonName
      );
    }
  },
  createDB:function(){
    console.log("Creamos la base de datos");
    this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
  },
  createLocalDB:function(tx){
    var sql="CREATE TABLE IF NO EXIST localDB ("+
            "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
            "nombre VARCHAR(50),"+
            "apellidos VARCHAR(256),"+
            "cargo VARCHAR(128),"+
            "email VARCHAR(64) )"
        ;
        tx.executeSql(sql);

        sql="INSERT INTO localDB(nombre,apellidos,cargo,email)"+
            "VALUES('Alex','de la Iglesia','Director','delaIglesia@gmail.com')";
            tx.executeSql(sql);

        sql="INSERT INTO localDB(nombre,apellidos,cargo,email)"+
            "VALUES('Quentin','Tarantino','Director','quentin@gmail.com')";
            tx.executeSql(sql);
  },
  createDBError:function(){

  },
  createLocalSucc:function(){
    console.log("Se ha guardado la base de datos con éxito.");
    window.localStorage.setItem("existe_db",1);
  },

};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        confBD.initialize();

        navigator.notification.alert(
            'Alerta de arranque',  // message
            this.alertDismissed,         // callback
            'Arranque',            // title
            'Perfect!'                  // buttonName
        );

      },
      alertDismissed:function() {
          // do something
      }
};

app.initialize();
