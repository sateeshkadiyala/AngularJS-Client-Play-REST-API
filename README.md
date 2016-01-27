# AngularJS-Client-Play-REST-API

This project intends to provide out of the box solution for all those who want to build Products and test their hypothesis quickly.

It provides secure access to your REST API Calls using an OAuth2 provider(facebook). This project uses the AngularJS web app as client, you can replace the client with any mobile app also.

##Server Side:

The server side project leverages Playframework 2.4.3 and secure social 3.0-M4 module.

Right now, the server code accepts three basic REST API calls

1. Authenticate by a provider (from secure social)
2. Log out the user (from secure social)
3. Restricted content call to get secrets : You can make this call only if you are authenticated.


###Client Side :

The client side project is developed using AngularJS, Angular Material, SCSS.

As of now, it has three views

1. Home : Default view
2. Restricted : Restricted view, you can view this only if you are logged in user, otherwise redirected to login view.
3. Login : It has got a Facebook Provider Login button.

###How does this work?

The AngularJS web client obtains the access token from OAUTH2 provider (facebook) and POST this token along with the email to secure social route.

 *API Call* :  
 
            `api/authenticate/provider'

*POST DATA*   :

            `{
            "email": “email”,
            "info": {
                "accessToken": “access_token”,
                "expiresIn": number_in_seconds
             }
            }`
            

 The server code which is integrated with secure social module handles the request by saving the user details in POSTGRESQL database and returns you a response that has the token and expiration.
 
 *Response* :
 
            `{
              "token" : "your_toke",
              "expiresOn" : number_in_secs
            }`
            
            
Client then takes the token and uses it for making subsequent calls by placing the token in "X-AUTH-TOKEN" header. If  your token expires you will get a 401. If you make a call without the token you will get a 401.

All the REST API calls are prefixed with '/api'. You can change this to whatever you want, but make sure that you change the grunt connection proxy settings, in order to make it work local.


The main source of information to knit all these pieces together is from the below article.

http://stackoverflow.com/questions/23868797/expose-play-framework-rest-calls-secured-via-securesocial-to-mobile-app



            











