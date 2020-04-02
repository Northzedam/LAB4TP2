
let paises = new Array();



const request = require("request-promise"),
  RUTA = "https://restcountries.eu/rest/v2/callingcode/";

const miPromesa = new Promise((resolve, rejection) => {
  var contador = 0;

  for (var i = 0; i <= 300; i++) {

    request({
      uri: RUTA + i,
      json: true, // Para que lo decodifique automáticamente 
    }).then(datosPaises => {

      datosPaises.forEach(pais => {

        datos = new Object();
        datos.codigoPais = pais.callingCodes[0],
          datos.nombrePais = pais.name,
          datos.capitalPais = pais.capital,
          datos.region = pais.region,
          datos.poblacion = pais.population,
          datos.latitud = pais.latlng[0],
          datos.longitud = pais.latlng[1]
        datos.nombrePais = datos.nombrePais.replace("'", "''");
        datos.capitalPais = datos.capitalPais.replace("'", "''");
        datos.region = datos.region.replace("'", "''");
        console.log('pais encontrado', datos.nombrePais);
        paises.push(datos), contador++;
        if (contador == 310) {      // este numero tiene que ser 1 mayor que el limitador del for
          resolve(paises);
        }

      })


    }).catch(function (err) {
      console.log('error 404'), contador++;
      if (contador == 310) {        // este numero tiene que ser 1 mayor que el limitador del for
        resolve(paises);
      }

    });



  }





});

miPromesa.then(data => {
  data.forEach(datos => {
    console.log('nombre de pais: ', datos.nombrePais);

    //------------------------------------------------------------------------

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
      var sqlSel = "SELECT codigoPais FROM pais WHERE codigoPais = '" + datos.codigoPais + "' ";

      var codigoRespondidoBd = ''; // ACA SE VA A GUARDAR LA RESPUESTA DE LA BD

      const promesaSelect = new Promise((resolve, rejection) => {

        con.query(sqlSel, function (err, result) {
          codigoRespondidoBd = result[0], resolve(result);
        });

      });

      promesaSelect.then(result => {
        if (codigoRespondidoBd == undefined || codigoRespondidoBd == '') {
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
  
              console.log("1 record updated:", result);
            }
          });
  
  
        }


      }).catch(function(err){
        console.log(err);
      });
      

    });

    //------------------------------------------------------------------------------








  });
});






//CONSUMO DE API EXTERNA -------------------------------------------------------------------




// Y AHORA LA CONEXION Y PERSISTENCIA EN LA BASE DE DATOS
/*


*/
