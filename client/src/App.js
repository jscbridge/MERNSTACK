import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  //Valores de los usuarios del mysql
  const [infoUsers, setInfoUsers] = useState("");

  // Vista hidden/visible usuarios
  const [viewUsers, setViewUsers] = useState(true);

  // Detecta el id del user al clickear, recoge su id
  const [userClick, setUserClick] = useState("");

  // Existe email [true].  No existe [false]
  const [existe, setExiste] = useState(false);
  const [message, setMessage] = useState(false);

//Recoge el valor Select (eamil) para eliminar user
  const [select, setSelect] = useState("");

  // Valores recogidos de mongo
  const [tareas, setTareas] = useState("");

  // Multiuso para campo insertar/updatear
  const [nombreTarea, setNombreTarea] = useState("");

  // Estados de los valores del registro [nombre, email, pass]
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    fetch("/getusers")
      .then((res) => res.json(res))
      .then((res) => {
        setInfoUsers(res);
      });
  }, []);

  const login = () => {
    if (pass == infoUsers[userClick - 1].pass) {
      let idUsuario = userClick;
      let info = {
        method: "POST",
        body: JSON.stringify({ idUsuario }),
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      };
      fetch("/getareas", info)
        .then((res) => res.json(res))
        .then((res) => {
          console.log(res);
          setTareas(res);
          setViewUsers(false);
        });
    } else {
      setMessage(true);
    }
  };

  const borrar = (nombreTarea) => {
    let info = {
      method: "DELETE",
      body: JSON.stringify({ nombreTarea }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    fetch("/deletetareas", info)
      .then((res) => res.json(res))
      .then((res) => {
        login();
      });
  };

  const insertar = () => {
    console.log("pasa");
    let idUsuario = userClick;

    let info = {
      method: "POST",
      body: JSON.stringify({ idUsuario, nombreTarea }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    fetch("/inserttareas", info)
      .then((res) => res.json(res))
      .then((res) => {
        login();
      });
  };
  const cambiar = (posicionTarea) => {
    let tasks = document.getElementsByClassName("updateTarea");
    for (let i = 0; i < tasks.length; i++) {
      document.getElementsByClassName("updateTarea")[i].style.display = "none";
    }

    let task = (document.getElementsByClassName("updateTarea")[
      posicionTarea
    ].style.display = "flex");
  };

  const actualizar = (id) => {
    console.log(id);
    let info = {
      method: "PUT",
      body: JSON.stringify({ id, nombreTarea }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    fetch("/updatetareas", info)
      .then((res) => res.json(res))
      .then((res) => {
        login();
      });
  };

  const registrar = () => {
    let info = {
      method: "POST",
      body: JSON.stringify({ userName: name, email, pass }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    fetch("/insertuser", info)
      .then((res) => res.json(res))
      .then((res) => {
        if (res == "existe") {
          setExiste(true);
        } else {
          setExiste(false);
          window.location.reload(true);
        }
      });
  };
  const borrarUser = () => {
    console.log(select);
    let info = {
      method: "DELETE",
      body: JSON.stringify({ email: select }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    fetch("/deleteuser", info)
      .then((res) => res.json(res))
      .then((res) => window.location.reload(true));
  };
  return (
    <div id="App">
      <div id="registrar">
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="UserName"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          placeholder="Pass"
        />

        <button
          onClick={() => {
            registrar();
          }}
        >
          Registrar
        </button>
        {existe ? <p>Ya existe ese correo</p> : ""}
        <div>
          <select name="select" onChange={(e) => setSelect(e.target.value)}>
            {infoUsers
              ? infoUsers.map((user, i) => {
                  return <option key={i}>{user.email}</option>;
                })
              : ""}
          </select>
          <button
            onClick={() => {
              borrarUser();
            }}
          >
            Borrar
          </button>
        </div>
      </div>

      {viewUsers ? (
        <div>
          <div id="users">
            {infoUsers
              ? infoUsers.map((user, i) => {
                  return (
                    <button
                      id="btn-users"
                      onClick={() => {
                        setUserClick(user.idUser);
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
              {message ? <p>Incorrecto</p> : ""}
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
                      <button
                        id={tarea._id}
                        onClick={(e) => actualizar(e.target.id)}
                      >
                        Actualizar
                      </button>
                    </div>
                    <button onClick={() => borrar(tarea.nombreTarea)}>
                      Borrar Tarea
                    </button>
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

export default App;
