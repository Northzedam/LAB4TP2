
package tp2.lab4;

import entities.Pais;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import org.json.simple.parser.JSONParser;


public class TP2Lab4 {

/**
 *
 * @author SnK
 */
    public static void main(String[] args) throws Exception {
        
        
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("TP2-lab4PU");
        EntityManager em = emf.createEntityManager();
        
       
        JSONParser parser = new JSONParser();

        String restUrl = "https://restcountries.eu/rest/v2/callingcode/";

        Pais paisSql = new Pais();
        Metodos me = new Metodos();
        me.metodoPais(paisSql,parser,restUrl,em);
        em.close();
        emf.close();
        
    }
}
        
      


