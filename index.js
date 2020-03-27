

//CONSUMO DE API EXTERNA -------------------------------------------------------------------

const request = require("request-promise"),
    RUTA = "https://restcountries.eu/rest/v2/callingcode/";

    
    for(var i=50;i<=60;i++){
        request({
          uri: RUTA+i,
          json: true, // Para que lo decodifique automáticamente 
        }).then(paises => {
            paises.forEach(pais => {
                //console.log(`Tenemos a un pais llamado ${pais.name}`);
                
                
              var datos ={
                  codigoPais : pais.callingCodes,
                  nombrePais : pais.name,
                  capitalPais : pais.capital,
                  region : pais.region,
                  poblacion : pais.population,
                  latitud : pais.latlng[0],
                  longitud : pais.latlng[1],
              }
              console.log(datos);
              
              var mysql = require('mysql');

                var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "pais"
                });

                con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                //ahora buscamos si el pais actual existe en la bd, si existe, actualizo sus datos, sino lo inserto
               // var consulta = "SELECT * FROM pais WHERE codigoPais = " + datos.codigoPais +";";
                //var paisBuscado = con.query(consulta, function (err, result) {
                //  if (err) throw err;
                  
              //});


                var sql = "INSERT INTO pais (codigoPais, nombrePais, capitalPais, region, poblacion, latitud, longitud) VALUES ('"+datos.codigoPais+"','"+datos.nombrePais+"','"+datos.capitalPais+"','"+datos.region+"','"+datos.poblacion+"','"+datos.latitud+"','"+datos.longitud+"')";
                                                                                                                            // "54, argentina", "capitalPais", "region", "100000", "1234", "12345"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
                });

            })
        }).catch(function(err){
          console.log("no hay datos");
        });

    }
   





// Y AHORA LA CONEXION Y PERSISTENCIA EN LA BASE DE DATOS




            
            