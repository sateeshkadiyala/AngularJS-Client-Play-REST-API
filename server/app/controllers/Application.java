package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.F;
import play.libs.Json;
import play.mvc.*;
import javax.inject.Inject;


import securesocial.core.BasicProfile;
import securesocial.core.RuntimeEnvironment;
import securesocial.core.java.SecureSocial;
import securesocial.core.java.SecuredAction;
import securesocial.core.java.UserAwareAction;
import service.customer.CustomerProfile;

public class Application extends Controller  {

    private RuntimeEnvironment env;

    /**
     * A constructor needed to get a hold of the environment instance.
     * This could be injected using a DI framework instead too.
     *
     * @param env
     */
    @Inject
    public Application (RuntimeEnvironment env) {
        this.env = env;
    }

    @SecuredAction(responses = MySecuredResponses.class)
    public Result restricted() {
        CustomerProfile user = (CustomerProfile) ctx().args.get(SecureSocial.USER_KEY);
        ObjectNode result = Json.newObject();
        result.put("message", "Secret..Shhh!!");
        return ok(result);
    }

    public Result test(){
        response().setHeader("Access-Control-Allow-Origin", "*");
        ObjectNode result = Json.newObject();

        result.put("greetings", "HI..Warrior!");
        return ok(result);
    }


}
