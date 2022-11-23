import React, { useState, useEffect } from "react";
import Register from "./Register";

const Insert = (props) => {
  //Valores de los usuarios del mysql
  const [infoUsers, setInfoUsers] = useState("");

  // Vista hidden/visible usuarios
  const [viewUsers, setViewUsers] = useState(true);

  // Detecta el id del user al clickear, recoge su id
  const [userClick, setUserClick] = useState("");

  // Incorrecto pass
  const [message, setMessage] = useState(false);

  // Valores recogidos de mongo
  const [tareas, setTareas] = useState("");

  // Multiuso para campo insertar/updatear
  const [nombreTarea, setNombreTarea] = useState("");

  // Estado del los valor del login [pass]
  const [pass, setPass] = useState("");

  // Carga la pg con los datos de los users [infoUsers]
  useEffect(() => {
    fetch("/getusers")
      .then((res) => res.json(res))
      .then((res) => {
        setInfoUsers(res);
      });
  }, []);

  //! Cuando se loguea al poner el pass.
  const login = () => {
    if (pass == infoUsers[userClick - 1].pass) {
      let idUsuario = infoUsers[userClick - 1].idUser;
      metaInfo("POST", { idUsuario }, "/getareas");
    } else {
      setMessage("Incorrecto");
    }
  };

  const insertar = () => {
    let idUsuario = infoUsers[userClick - 1].idUser;
    metaInfo("POST", { idUsuario, nombreTarea }, "/inserttarea");
  };
  const actualizar = (id) => {
    metaInfo("PUT", { id, nombreTarea }, "/updatetareas");
  };
  const borrar = (nombreTarea) => {
    metaInfo("DELETE", { nombreTarea }, "/deletetarea");
  };

  const metaInfo = (method, info, endpoint) => {
    let datos = {
      method: method,
      body: JSON.stringify(info),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };

    fetch(endpoint, datos)
      .then((res) => res.json(res))
      .then((res) => {
        if (endpoint == "/getareas") {
          setTareas(res);
          setViewUsers(false);
        } else {
          login();
        }
      });
  };

  const cambiar = (posicionTarea) => {
    let tasks = document.getElementsByClassName("updateTarea");
    for (let i = 0; i < tasks.length; i++) {
      document.getElementsByClassName("updateTarea")[i].style.display = "none";
    }
    let task = (document.getElementsByClassName("updateTarea")[posicionTarea].style.display =
      "flex");
  };

  return (
    <div id="App">
        
     {/*COMPONENTE REGISTER*/}

      <Register data={infoUsers} />

      {/*PINTA LOS USERS Y PASS */}

      {viewUsers ? (
        <div>
          <div id="users">
            {infoUsers
              ? infoUsers.map((user, i) => {
                  return (
                    <button
                      className="btn-users"
                      onClick={() => {
                        setUserClick(i + 1);
                        console.log(i);
                        setMessage(false);
                      }}
                      key={i}
                    >
                      {user.userName}
                    </button>
                  );
                })
              : ""}
          </div>{" "}
          {userClick ? (
            <div id="input-pass">
              <input
                type="password"
                placeholder={`Pon tu Pass ${infoUsers[userClick - 1].userName}`}
                onChange={(e) => setPass(e.target.value)}
              />
              <br></br>
              <button onClick={() => login()}>Loguear</button>
              {message ? <p>{message}</p> : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            setViewUsers(true);
            setTareas(false);
          }}
        >
          Cerrar sesión
        </button>
      )}

      {tareas ? (
        <div id="tareas">
          <h3>{infoUsers[userClick - 1].userName}</h3>
          <div id="cont-tarea">
            {tareas.map((tarea, i) => {
              return (
                <div key={i}>
                  <p>{i + 1}º Tarea</p>
                  <div key={i} className="tarea">
                    <p>{tarea.nombreTarea}</p>
                    <div className="updateTarea">
                      <input
                        placeholder="Modificar Nombre Tarea"
                        onChange={(e) => setNombreTarea(e.target.value)}
                      ></input>
                      <button id={tarea._id} onClick={(e) => actualizar(e.target.id)}>
                        Actualizar
                      </button>
                    </div>
                    <button onClick={() => borrar(tarea.nombreTarea)}>Borrar Tarea</button>
                    <button onClick={() => cambiar(i)}>Cambiar</button>
                  </div>
                </div>
              );
            })}
          </div>
          <br></br>
          <div id="isertarTarea">
            <p>INSERTAR TAREA</p>
            <input
              type="text"
              placeholder="Nombre Tarea"
              onChange={(e) => setNombreTarea(e.target.value)}
            />
            <button onClick={() => insertar()}>INSERTAR</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Insert;
