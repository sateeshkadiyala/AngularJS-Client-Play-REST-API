package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.*;
import play.libs.Json;
import play.libs.ws.WSClient;
import play.libs.ws.WSRequest;
import play.mvc.*;


import views.html.*;

public class Application extends Controller {

    public Result index() {
        ObjectNode result = Json.newObject();
        result.put("message", "CORS - Enabled.");
        return ok(result);
    }

    public Result authenticate(){
        String access_token_url = "https://graph.facebook.com/v2.5/oauth/access_token";
        String graph_api_url = "https://graph.facebook.com/v2.5/me";



        ObjectNode result = Json.newObject();
        result.put("message", "Implement Authentication Stupid..!");
        return ok(result);
    }

}
