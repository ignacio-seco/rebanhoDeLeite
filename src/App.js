import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCattle from "./Components/AddCattle/AddCattle";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import HomePage from "./Pages/HomePage";
import CattleHerdPage from "./Pages/CattleHerdPage";
import CattleShedPage from "./Pages/CattleShedPage";
import Reports from "./Pages/Reports";
import RebanhoDetalhado from "./Pages/Relatorios/RebanhoDetalhado";
import Perdas from "./Pages/Relatorios/Perdas";
import Vendas from "./Pages/Relatorios/Vendas";
import CattleDetailsPage from "./Pages/CattleDetailsPage";
import Bezerros from "./Pages/Relatorios/Bezerros";
import Pastos from "./Pages/Relatorios/Pastos";
import MilkMonitoring from "./Components/MilkMonitoring/MilkMonitoring";

function App() {
  const [cattle, setCattle] = useState([]);

  const getCattle = () => {
    axios
      .get()
      .then((response) => setCattle(response.data))
      .catch(() => console.log("Something went wrong"));
  };

  useEffect(() => {
    getCattle();
  }, []);

  return (
    <div className="App">
      <div className="sticky-top">
        <NavigationBar />
      </div>
      <div style={{ width: "100%", height: "95vh", overflow: "auto" }}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/gado"
            element={
              <CattleHerdPage
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/curral"
            element={
              <CattleShedPage
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/cadastrarAnimal"
            element={<AddCattle getCattle={getCattle} />}
          />
          <Route
            path="/gado/:id"
            element={<CattleDetailsPage />}
          />
          <Route
            path="/relatorios"
            element={
              <Reports
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/relatorios/rebanhodetalhado"
            element={
              <RebanhoDetalhado
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/relatorios/perdas"
            element={
              <Perdas
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/relatorios/vendas"
            element={
              <Vendas
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/relatorios/bezerros"
            element={
              <Bezerros
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/relatorios/pastos"
            element={
              <Pastos
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/curral/monitoramentoleite"
            element={
              <MilkMonitoring
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
