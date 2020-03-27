

//CONSUMO DE API EXTERNA -------------------------------------------------------------------

const request = require("request-promise"),
    RUTA = "https://restcountries.eu/rest/v2/callingcode/";

    
    for(var i=1;i<=300;i++){
        request({
          uri: RUTA+i,
          json: true, // Para que lo decodifique automáticamente 
        }).then(paises => {
            paises.forEach(pais => {      
                                                        
              var datos ={
                  codigoPais : pais.callingCodes[0],
                  nombrePais : pais.name,
                  capitalPais : pais.capital,
                  region : pais.region,
                  poblacion : pais.population,
                  latitud : pais.latlng[0],
                  longitud : pais.latlng[1],
              }
              console.log(pais.callingCodes);
              
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
                

              var sql = "INSERT INTO pais (codigoPais, nombrePais, capitalPais, region, poblacion, latitud, longitud) VALUES ('"+datos.codigoPais+"','"+datos.nombrePais+"','"+datos.capitalPais+"','"+datos.region+"','"+datos.poblacion+"','"+datos.latitud+"','"+datos.longitud+"')";
              var sqlUp ="UPDATE  pais SET codigoPais='"+datos.codigoPais+"', nombrePais='"+datos.nombrePais+"', capitalPais='"+datos.capitalPais+"', region='"+datos.region+"', poblacion='"+datos.poblacion+"', latitud='"+datos.latitud+"', longitud='"+datos.longitud+"' WHERE codigoPais = '"+datos.codigoPais+"' ";                                                                                                           // "54, argentina", "capitalPais", "region", "100000", "1234", "12345"
              var sqlSel="SELECT codigoPais FROM pais WHERE codigoPais = '"+i+"' ";
            
               con.query(sqlSel, function (err, result) {
                 
                      if (result[0]!=undefined){
                        console.log("la respuesta de la bd es: ",result[0]);
                        con.query(sqlUp, function (err, result){
                          if(err) throw err;
                        });      
                        console.log("1 record update");
                
                        } 
                        else{
                          con.query(sql, function (err, result){
                            if(err) throw err;
                          });      
                          console.log("1 record insert");
                  
                        }
                
             });
             });
             
         })
        }).catch(function(err){
          console.log("no hay datos");
          
        });

    }
   





// Y AHORA LA CONEXION Y PERSISTENCIA EN LA BASE DE DATOS




            
            