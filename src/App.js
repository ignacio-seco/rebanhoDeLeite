import { useContext } from "react";
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
import Bezerros from "./Pages/Relatorios/Bezerros.js";
import Pastos from "./Pages/Relatorios/Pastos";
import MilkMonitoring from "./Pages/Monitoramentos/MilkMonitoring";
import Monitoring from "./Pages/Monitoring";
import WeightMonitor from "./Pages/Monitoramentos/WeightMonitor";
import { AuthContext } from "./contexts/authContext";
import CadastrarPastos from "./Pages/CadastroPastos";
import Ganhos from "./Pages/Ganhos";
import Gastos from "./Pages/Gastos";
import Finances from "./Pages/FinancasMainPage";
import GraficoFinanceiro from "./Pages/graficoFInanceiro";
import LandingPage2 from "./Pages/LandingPage2";
import Tarefas from "./Pages/Tarefas";
import Nascimentos from "./Pages/Relatorios/Nascimentos";
import Observacoes from "./Pages/Relatorios/Observacoes";

function App() {
  const { loggedInUser } = useContext(AuthContext);

  if (!loggedInUser) {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={<LandingPage2 />}
          />
          <Route
            path="*"
            element={<LandingPage2 />}
          />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="sticky-top">
          <NavigationBar />
        </div>
        <div style={{ width: "100%", height: "92vh", overflow: "auto" }}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/gado"
              element={<CattleHerdPage />}
            />
            <Route
              path="/curral"
              element={<CattleShedPage />}
            />
            <Route
              path="/cadastrarAnimal"
              element={<AddCattle />}
            />
            <Route
              path="/gado/:id"
              element={<CattleDetailsPage />}
            />
            <Route
              path="/relatorios"
              element={<Reports />}
            />
            <Route
              path="/relatorios/rebanhodetalhado"
              element={<RebanhoDetalhado />}
            />
            <Route
              path="/relatorios/perdas"
              element={<Perdas />}
            />
            <Route
              path="/relatorios/vendas"
              element={<Vendas />}
            />
            <Route
              path="/relatorios/bezerros"
              element={<Bezerros />}
            />
            <Route
              path="/relatorios/pastos"
              element={<Pastos />}
            />
            <Route
              path="/relatorios/nascimentos"
              element={<Nascimentos />}
            />
              <Route
              path="/relatorios/observados"
              element={<Observacoes />}
            />
            <Route
              path="/monitoramento"
              element={<Monitoring />}
            />
            <Route
              path="/monitoramento/monitoramentoleite"
              element={<MilkMonitoring />}
            />
            <Route
              path="/monitoramento/monitoramentopeso"
              element={<WeightMonitor />}
            />
            <Route
              path="/cadastropasto"
              element={<CadastrarPastos />}
            />
            <Route
              path="/financas"
              element={<Finances />}
            />
            <Route
              path="/financas/ganhos"
              element={<Ganhos />}
            />
            <Route
              path="/financas/gastos"
              element={<Gastos />}
            />
            <Route
              path="/financas/balanco"
              element={<GraficoFinanceiro />}
            />
            <Route
              path="/tarefas"
              element={<Tarefas />}
            />
            <Route
              path="*"
              element={<HomePage />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;