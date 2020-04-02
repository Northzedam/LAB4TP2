controlDeEjecucion();
var Deferred = require ('deferred');

function controlDeEjecucion(){
  promise = obtencionDatosApi().then(persistenciaBD);
}

function obtencionDatosApi(){
  var d = new DEFERRED();
  console.log('se obtienen datos de la api');
  setTimeout(console.log('se ejecuta la primera funcion'),3000);
  d.resolve(persistenciaBD);
}

function persistenciaBD(){
  console.log('se ejecuta la persistencia en bd');
}


//CONSUMO DE API EXTERNA -------------------------------------------------------------------
/*
const request = require("request-promise"),
  RUTA = "https://restcountries.eu/rest/v2/callingcode/";


for (var i = 1; i <= 300; i++) {
  request({
    uri: RUTA + i,
    json: true, // Para que lo decodifique automáticamente 
  }).then(paises => {
    paises.forEach(pais => {

      var datos = {
        codigoPais: pais.callingCodes[0],
        nombrePais: pais.name,
        capitalPais: pais.capital,
        region: pais.region,
        poblacion: pais.population,
        latitud: pais.latlng[0],
        longitud: pais.latlng[1],
      }
      datos.nombrePais = datos.nombrePais.replace("'","''");
      datos.capitalPais = datos.capitalPais.replace("'","''");
      datos.region = datos.region.replace("'","''");
      

      var mysql = require('mysql');

      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "pais"
      });

      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");


        var sqlSave = "INSERT INTO pais (codigoPais, nombrePais, capitalPais, region, poblacion, latitud, longitud) VALUES ('" + datos.codigoPais + "','" + datos.nombrePais + "','" + datos.capitalPais + "','" + datos.region + "','" + datos.poblacion + "','" + datos.latitud + "','" + datos.longitud + "')";
        var sqlUp = "UPDATE  pais SET nombrePais='" + datos.nombrePais + "', capitalPais='" + datos.capitalPais + "', region='" + datos.region + "', poblacion='" + datos.poblacion + "', latitud='" + datos.latitud + "', longitud='" + datos.longitud + "' WHERE codigoPais = '" + datos.codigoPais + "' ";                                                                                                           // "54, argentina", "capitalPais", "region", "100000", "1234", "12345"
        var sqlSel = "SELECT codigoPais FROM pais WHERE codigoPais = '" + i + "' ";

        var codigoRespondidoBd = ''; // ACA SE VA A GUARDAR LA RESPUESTA DE LA BD

        con.query(sqlSel, function (err, result) {
          codigoRespondidoBd = result[0];
        });

        if (codigoRespondidoBd == undefined || codigoRespondidoBd =='') {
          con.query(sqlSave, function (err, result) {
            if (err) {
              throw err;
            } else {
              console.log("1 record insert");
            }
          });


        }
        else {
          con.query(sqlUp, function (err, result) {
            if (err) {
              throw err;
            } else {
              
              console.log("1 record updated:",result);
            }
          });


        }

      });

    });

  
    }).catch(function (err) {
      console.log("no hay datos");

    });

  

  
*/



// Y AHORA LA CONEXION Y PERSISTENCIA EN LA BASE DE DATOS
