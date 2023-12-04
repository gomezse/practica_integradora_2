Segunda Practica Integradora.

usuario cargado 1:
email :"prueba@prueba.com"
password:123
role:"ADMIN"

usuario cargado 2:
email :"prueba2@prueba2.com"
password:123
role:"USER"

usuario cargado 3:
email :"prueba3@prueba3.com"
password:123
role:"PREMIUM"



ENDPOINTS:
http://localhost:8080/signup
http://localhost:8080/login

http://localhost:8080/api/sessions/current (en caso de ser admin, muestra info del user, caso contrario, handlebars de error).


VALIDACION DE ROLE EN MIDDLEWARE auth.middleware.js