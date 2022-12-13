import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import Dexie from "dexie";

const AuthContext = createContext();

function AuthContextComponente(props) {
  //estados que serão atualizados
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });
  const [data, setData] = useState({
    rebanho: [],
    pastos: [""],
    gastos: [],
    ganhos: [],
    tarefas: [],
    nome: "",
  });
  const [loading, setLoading] = useState(true);

  const db = new Dexie("loggedUser");
  db.version(1).stores({ user: "uuid" });
  const { user } = db;


  //funções utilizadas
  const getData = async () => {
    setLoading(true);
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    const parsedLoggedInUser = JSON.parse(loggedInUserJson || '""');
    let id = parsedLoggedInUser.user.uuid
    let userData = await user.get(id);
    if(!userData){api
      .get("/user/perfil")
      .then(async (response) => {
        await user.add(response.data);
        let newData = await user.get(id);
        setData(newData);
      })
      .then(()=>console.log(data))
      .then(() => setLoading(false))
      .catch((err) => console.log("Something went wrong", err));
  }else {await setData(userData);
    setLoading(false)}}
    
  const getLoggedInUser = () => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    const parsedLoggedInUser = JSON.parse(loggedInUserJson || '""');
    if (parsedLoggedInUser.token) {
      setLoggedInUser(parsedLoggedInUser);
      getData();
    } else {
      setLoggedInUser(null);
    }
  };
  //useEffect
  useEffect(getLoggedInUser, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        data,
        setData,
        loading,
        setLoading,
        getData,
        getLoggedInUser,
        user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponente };
