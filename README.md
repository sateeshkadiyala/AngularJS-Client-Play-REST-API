# AngularJS-Client-Play-REST-API

This project intends to provide out of the box solution for all those who want to build Products and test their hypothesis quickly.

##Server Side:

The server side project leverages Playframework 2.4.3 and secure social 3.0-M4 module.

Right now, the server code accepts three basic REST API calls

1. Authenticate by a provider (from secure social)
2. Log out the user (from secure social)
3. Restricted content call to get secrets : You can make this call only if you are authenticated.


##Client Side :

The client side project is developed using AngularJS, Angular Material, SCSS.

As of now, it has three views

1. Home : Default view
2. Restricted : Restricted view, you can view this only if you are logged in user, otherwise redirected to login view.
3. Login : It has got a Facebook Provider Login button.








