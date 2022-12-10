import { createContext, useState, useEffect } from "react";
import api from "../api/api";

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
  //funções utilizadas
  const getData = () => {
    setLoading(true);
    api
      .get("/user/perfil")
      .then((response) => {
        setData(response.data);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log("Something went wrong", err));
  };
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponente };
