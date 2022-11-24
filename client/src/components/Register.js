import React, { useState } from "react";

const Register = (props) => {
  // [Valores del registro]
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Si hay o no email igual
  const [existe, setExiste] = useState(false);
  // Email seleccionado para borrar
  const [selectEmail, setSelectEmail] = useState("");
  // Se guarda el props del padre
  const [infoUsers, setUsers] = useState("");
  //Para que se cargue cuando lo cargue el padre
  setTimeout(() => {
    if (infoUsers === "") {
      setUsers(props.data);
    }
  });
  // REGISTRASE
  const registrar = () => {
    // REGEXP [Nombre, EMAIL, PASS]
    let okUserName = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ]+.?(( |-)[a-zA-ZÀ-ÖØ-öø-ÿ]+.?)*").test(name);
    let okEmail = new RegExp("^[a-zA-Z0-9.!_`{|}~-ñ]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$").test(email);
    let okPass = new RegExp("^([0-9])*$").test(pass);
    
    if (okEmail && okPass && okUserName) {
      metaInfo("POST", { userName: name, email, pass }, "/insertuser");
    } else {
      setExiste("Campos invalidos");
    }
  };
  // BORRAR USER
  const borrarUser = () => {
    metaInfo("DELETE", { email: selectEmail }, "/deleteuser");
  };

  //! Función para decidir que (METHOD, INFO, ENDPOINT) + FECTH
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
        if (endpoint === "/insertuser") {
          if (res.msn === "existe") {
            setExiste("Ya existe ese correo");
          } else {
            setExiste(false);
            window.location.reload(true);
          }
        } else {
          window.location.reload(true);
        }
      });
  };

  return (
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
      {existe ? <p>{existe}</p> : ""}
      <div>
        <select name="select" onChange={(e) => setSelectEmail(e.target.value)}>
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
  );
};

export default Register;
