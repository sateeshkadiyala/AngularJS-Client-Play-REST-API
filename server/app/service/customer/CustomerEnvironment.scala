
package service.customer

import controllers.MySecuredResponses
import play.api.Application
import securesocial.core.{EventListener, RuntimeEnvironment}
import securesocial.core.authenticator.HttpHeaderAuthenticator
import securesocial.core.java.{DefaultSecuredActionResponses, SecuredActionResponses}
import securesocial.core.services.UserService

class CustomerEnvironment extends RuntimeEnvironment.Default {
  type U = CustomerProfile
  override val userService: UserService[U] = new CustomerProfileService()

}
