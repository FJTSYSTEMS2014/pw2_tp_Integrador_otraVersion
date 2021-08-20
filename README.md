# previamente debe tener insnp,talado c++ 2019
https://support.microsoft.com/es-es/topic/descargas-m%C3%A1s-recientes-compatibles-de-visual-c-2647da03-1eea-4433-9aff-95f26a218cc0
* link desdecarga: 
https://aka.ms/vs/16/release/vc_redist.x64.exe

Pueden adelantar haciendo la descarga de 'MySQL Installer' desde aquí:

https://dev.mysql.com/downloads/windows/installer/8.0.html


# tiene que hacer una instalación custom seleccionando los siguientes componentes:

* [1] MySQL Server
* [2] MySQL Workbench
* [3] Connector/NET



# LEEME!

El tipo de archivo `README.md` se denomina **markdown** porque la extensión es `.md`).
Este archivo `README.md` contiene informacion requerida para se anexada al `trabajo práctico Integrador` de la materia: `PROGRAMACIÓN WEB 2`.

---

Materia: "Programación WEB 2"
Docentes: "Juan Martinez y Eduardo Cuomo"
Title: "Programación Web 2 - Trabajo Práctico Integrador."
Group: 3
Authors: "Aldo Capezzali – Franck Tscherig – Matias Cosentino"
Date: "31/05/2021"

---

[![N|Solid](https://i.ibb.co/kg7pkTq/iupa.png)](https://iupa.edu.ar/campus/login/index.php)

## Trabajo Práctico nº Integrador : Objetivos

# Descripción

### Implementar una aplicación para llevar el control de una lista de tareas pendientes (TODOs). Cada tarea está compuesta por un título, una descripción y un estado (pendiente, completada o eliminada). La aplicación debería permitir crear y modificar tareas, cambiarlas de estado y listarlas, teniendo en cuenta las siguientes consideraciones:

1. El título es obligatorio.
2. La descripción es opcional.
3. Sólo deben listarse las tareas que no están en estado eliminado.
4. Las tareas deben crearse con estado pendiente, luego pueden pasar al estado completada o eliminada.
5. Una tarea pendiente o completada puede eliminarse, pero una tarea eliminada no puede cambiar su estado.
6. La aplicación debe contar con un mecanismo de autenticación, y cada usuario debería poder acceder únicamente a las tareas que él creó.
7. No debe visualizarse la lista de tareas hasta que el usuario inicie sesión.
8. No se deben poder realizar acciones hasta que el usuario esté logueado.
9. Los usuarios se crearán en la Base de Datos directamente.
10. Las entradas deberán contar con una fecha de creación y una fecha de edición.
11. Debe ser posible editar un registro en estado pendiente únicamente.

La aplicación constará de un un frontend que se comunicará con una API REST, que a su vez hará uso de una base de datos MySQL para almacenar la información.

## Código
• Proyecto grupo 3 : https://github.com/FJTSYSTEMS2014/Tp_Integrador_PW2_G3.git

Documentación
• Consigna - TP integrador https://docs.google.com/document/d/1bWJD_kkKwFzzHMWj_UV4aP0W2yzMh78nQb6QZBw0CZQ
• Grupos: https://docs.google.com/document/d/1Rc249wx8Kg5K_QuKpIjpwosfbyC6uDXd95cX1oxQnC4/edit?usp=sharing

## base de datos:
CREATE DATABASE grupo3;

USE grupo3;

CREATE TABLE usuarios(
dni_usuario VARCHAR(200)  PRIMARY KEY,
nombre_apellido VARCHAR(200),
fecha_nacimiento date,
domicilio VARCHAR(200),
localidad VARCHAR(200) ,
telefono VARCHAR(200) ,
username VARCHAR(200) ,
pass VARCHAR(200));

CREATE TABLE tareas(
id INT  UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
dni_usuario VARCHAR(200) ,
titulo VARCHAR(200),
descripcion VARCHAR(200) ,
estado enum ('pendiente','completada','eliminada'),
created date ,
updated date,
eliminated date,
FOREIGN KEY (dni_usuario) REFERENCES usuarios(dni_usuario));

/* esta porcion de codigo se agrega super-usuarios.
se insertan valores desde la api de la rama:otra_version */ 

CREATE TABLE superUsuario(
nombre_usuario VARCHAR(200) PRIMARY KEY,
nombre_completo VARCHAR(200),
nombre_password VARCHAR(250)  
);

USE grupo3;
--  insert en tabla usuarios

INSERT INTO usuarios VALUES ("DNI33.333.333", "Bart Simpsons","1990-06-01","Siempre Viva 123", "springfield","+5492944898", "el_Barto","krusty");

INSERT INTO usuarios VALUES ("DNI38.333.111", "Lisa Simpsons","1992-08-11","Siempre Viva 123", "springfield","+5492944899", "LS","Chica_jazz");

INSERT INTO usuarios VALUES ("PAS45569-k", "Claudio Segundo","1970-06-01"," Rolling Stones 1236 - 1F", "kasajistan","+129298002555", "claudio123","12345678");

--  insert  en tabla tareas
/* el estado puede ser: 'pendiente','completada','eliminada' */

INSERT INTO tareas VALUES (1,"DNI33.333.333","tarea1","sumar numeros complejos", "pendiente","2021-06-01","2021-06-01","2021-06-01" );
INSERT INTO tareas VALUES (2,"PAS45569-k","tarea2","multiplicar numeros complejos", "pendiente","2021-06-01","2021-06-01","2021-06-01" );
INSERT INTO tareas VALUES (3,"DNI38.333.111","tarea1","sumar numeros complejos", "completada","2021-06-01","2021-06-02","2021-06-03" );