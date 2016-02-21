
package service.customer;

import com.avaje.ebean.Ebean;
import models.Customer;
import play.Logger;
import play.libs.F;
import play.libs.Scala;
import securesocial.core.*;
import securesocial.core.services.SaveMode;
import securesocial.core.java.BaseUserService;
import securesocial.core.java.Token;

import java.util.*;

public class CustomerProfileService extends BaseUserService<CustomerProfile> {
    public Logger.ALogger logger = play.Logger.of("application.service.customer.CustomerProfileService");

    private HashMap<String, CustomerProfile> users = new HashMap<String, CustomerProfile>();
    private HashMap<String, Token> tokens = new HashMap<String, Token>();

    @Override
    public F.Promise<CustomerProfile> doSave(BasicProfile profile, SaveMode mode) {
        CustomerProfile result = null;
        Customer customers = new Customer();
        if (mode == SaveMode.SignUp()) {
            result = new CustomerProfile(profile);
            customers.createdDate = new Date();
            customers.email = result.main.email().get();
            customers.firstName = result.main.firstName().get();
            customers.lastName = result.main.lastName().get();
            customers.isEmailValidated = false;
            customers.provider = result.main.providerId();
            customers.providerUserId = result.main.userId();
            customers.lastLogin = new Date();
            customers.save();
        } else if(mode == SaveMode.LoggedIn()){
            result = new CustomerProfile(profile);
        }else {
            throw new RuntimeException("Unknown SaveMode : Not able to signup");
        }
        return F.Promise.pure(result);
    }

    @Override
    public F.Promise<CustomerProfile> doLink(CustomerProfile current, BasicProfile to) {
        CustomerProfile target = null;

        for ( CustomerProfile u: users.values() ) {
            if ( u.main.providerId().equals(current.main.providerId()) && u.main.userId().equals(current.main.userId()) ) {
                target = u;
                break;
            }
        }

        if ( target == null ) {
            // this should not happen
            throw new RuntimeException("Can't find user : " + current.main.userId());
        }

        boolean alreadyLinked = false;
        for ( BasicProfile p : target.identities) {
            if ( p.userId().equals(to.userId()) && p.providerId().equals(to.providerId())) {
                alreadyLinked = true;
                break;
            }
        }
        if (!alreadyLinked) target.identities.add(to);
        return F.Promise.pure(target);
    }

    @Override
    public F.Promise<Token> doSaveToken(Token token) {
        tokens.put(token.uuid, token);
        return F.Promise.pure(token);
    }

    @Override
    public F.Promise<BasicProfile> doFind(String providerId, String userId) {
        if(logger.isDebugEnabled()){
            logger.debug("Finding user " + userId);
        }
        List<Customer> customer = Ebean.find(Customer.class).select("*")
                                        .where()
                                            .eq("provider_user_id", userId)
                                        .conjunction()
                                            .eq("provider", providerId)
                                        .findList();

        BasicProfile found = null;

        if(customer.size() >0) {
             found = buildBasicProfile(customer.get(0));
        }
        return F.Promise.pure(found);
    }

    private BasicProfile buildBasicProfile(Customer customer) {
        return BasicProfile$.MODULE$.apply(
                    customer.provider,
                    customer.providerUserId,
                    Scala.Option(customer.firstName),
                    Scala.Option(customer.lastName),
                    Scala.Option(customer.firstName+" "+customer.lastName),
                    Scala.Option(customer.email),
                    Scala.Option(""),
                    AuthenticationMethod.UserPassword(),
                    Scala.<OAuth1Info>None(),
                    Scala.<OAuth2Info>None(),
                    Scala.<PasswordInfo>None());
    }

    @Override
    public F.Promise<PasswordInfo> doPasswordInfoFor(CustomerProfile user) {
        throw new RuntimeException("doPasswordInfoFor is not implemented yet in sample app");
    }

    @Override
    public F.Promise<BasicProfile> doUpdatePasswordInfo(CustomerProfile user, PasswordInfo info) {
        throw new RuntimeException("doUpdatePasswordInfo is not implemented yet in sample app");
    }

    @Override
    public F.Promise<Token> doFindToken(String tokenId) {
        return F.Promise.pure(tokens.get(tokenId));
    }


    @Override
    public F.Promise<BasicProfile> doFindByEmailAndProvider(String email, String providerId) {
        BasicProfile found = null;

        List<Customer> customers = Ebean.find(Customer.class).select("*")
                .where()
                .eq("email", email)
                .conjunction()
                .eq("provider", providerId)
                .findList();

        return F.Promise.pure(found);
    }

    @Override
    public F.Promise<Token> doDeleteToken(String uuid) {
        return F.Promise.pure(tokens.remove(uuid));
    }

    @Override
    public void doDeleteExpiredTokens() {
        Iterator<Map.Entry<String,Token>> iterator = tokens.entrySet().iterator();
        while ( iterator.hasNext() ) {
            Map.Entry<String, Token> entry = iterator.next();
            if ( entry.getValue().isExpired() ) {
                iterator.remove();
            }
        }
    }
}
