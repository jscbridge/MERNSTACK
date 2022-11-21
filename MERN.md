![logotipo de The Bridge](https://user-images.githubusercontent.com/27650532/77754601-e8365180-702b-11ea-8bed-5bc14a43f869.png  "logotipo de The Bridge")


# [Bootcamp Web Developer Full Stack](https://www.thebridge.tech/bootcamps/bootcamp-fullstack-developer/)

### HTML, CSS,  JS, ES6, Node.js, Frontend, Backend, Express, React, MERN, testing, DevOps

### MERN COMPLETO



 ![Img de React](./00.jpg)
Vamos a ver una App con todo el Stack de MERN junto tb con la base de datos MySql.

La App consiste en administrar tareas de diferentes usuarios. Se está utilizando la base de datos MySql para la parte de los usuarios y Mongo para guardar las tareas.

##### MySQl Worbench

```mysql
#DROP DATABASE MERN;
create database MERN;
use MERN;

create table USERS (
    idUser INT AUTO_INCREMENT,
    userName VARCHAR(100),
    email VARCHAR(100),
    pass VARCHAR(100),
    PRIMARY KEY(idUser)
);
    
INSERT INTO USERS VALUES (NULL, "Coke", "cokiño@gmail.com","1111");
INSERT INTO USERS VALUES (NULL, "Lylith", "lylith@gmail.com","2222");
INSERT INTO USERS VALUES (NULL, "Davinia", "Davinia@gmail.com","3333");

SELECT * FROM USERS;
```


#### MongoDb Compass

Nombre BBDD: **MERN**
Nombre documento: **tareas**

Ejemplo copiar y pergarlo:

```mongo
{
  "_id": {
    "$oid": "637b348e3837350825bdd6c9"
  },
  "idUsuario": "1",
  "nombreTarea": "comprar moto"
}

```

 INSTALAR ESTOS PAQUETES:
 ```console
  npm i dotenv express mongoose mysql2 nodemon sequelize
 ```
##### [Repo MERN]()

