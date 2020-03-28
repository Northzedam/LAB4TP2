
package tp2.lab4;

import entities.Pais;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import javax.persistence.EntityManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;



/**
 *
 * @author SnK
 */
public class Metodos {
    
    
    public Metodos(){
    
    }
    
    public void metodoPais(Pais paisSql, JSONParser parser, String restUrl,EntityManager em){
    
        for (int codigo = 1; codigo <= 300; codigo++) {
            try {
                
                URL rutaJson = new URL(restUrl + codigo); 
                System.out.println(rutaJson);
                
                
                URLConnection yc = rutaJson.openConnection();
                
               
                BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
                
               
                JSONArray a = (JSONArray) parser.parse(in.readLine());
                
                
                if (a != null) {
                  
                    for (Object object : a) {
                       
                        em.getTransaction().begin();
                        
                        JSONObject paisJson = (JSONObject) object;
                        
                        
                        paisSql.setNombrePais((String) paisJson.get("name"));
                        paisSql.setCapitalPais((String) paisJson.get("capital"));
                        paisSql.setPoblacion((Long) paisJson.get("population"));
                        paisSql.setRegion((String) paisJson.get("region"));
                        
                        List latlong = (List) paisJson.get("latlng");
                        paisSql.setLatitud((double) latlong.get(0));
                        paisSql.setLongitud((double) latlong.get(1));
                        paisSql.setCodigoPais(codigo);

                        
                        
                        
                        em.merge(paisSql);
                        em.flush();
                        em.getTransaction().commit();
                    }
                } else {
                    
                    codigo++;
                    continue;
                }
                
                
                in.close();

            } catch (Exception e) {
                System.out.println("No hay pais con ese codigo");
            }

        }
        
        
    
    }
}
