import com.google.inject.AbstractModule;
import securesocial.core.RuntimeEnvironment;
import service.customer.CustomerEnvironment;


public class CustomerModule extends AbstractModule {
    @Override
    protected void configure() {
        CustomerEnvironment environment = new CustomerEnvironment();
        bind(RuntimeEnvironment.class).toInstance(environment);
    }
}
