import 'react-image-crop/dist/ReactCrop.css'
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddCattle from './Components/AddCattle/AddCattle.jsx';
import NavigationBar from './Components/NavigationBar/NavigationBar.jsx';
import HomePage from './Pages/HomePage.jsx';
import CattleHerdPage from './Pages/CattleHerdPage.jsx';
import CattleShedPage from './Pages/CattleShedPage.jsx';
import Reports from './Pages/Reports.jsx';
import RebanhoDetalhado from './Pages/Relatorios/RebanhoDetalhado.jsx';
import Perdas from './Pages/Relatorios/Perdas.jsx';
import Vendas from './Pages/Relatorios/Vendas.jsx';
import CattleDetailsPage from './Pages/CattleDetailsPage.jsx';
import Bezerros from './Pages/Relatorios/Bezerros.jsx';
import Pastos from './Pages/Relatorios/Pastos.jsx';
import MilkMonitoring from './Pages/Monitoramentos/MilkMonitoring.jsx';
import Monitoring from './Pages/Monitoring.jsx';
import WeightMonitor from './Pages/Monitoramentos/WeightMonitor.jsx';
import { AuthContext } from './contexts/authContext.jsx';
import CadastrarPastos from './Pages/CadastroPastos.jsx';
import Ganhos from './Pages/Ganhos.jsx';
import Gastos from './Pages/Gastos.jsx';
import Finances from './Pages/FinancasMainPage';
import GraficoFinanceiro from './Pages/graficoFInanceiro';
import LandingPage2 from './Pages/LandingPage2';
import Tarefas from './Pages/Tarefas';
import Nascimentos from './Pages/Relatorios/Nascimentos';
import Observacoes from './Pages/Relatorios/Observacoes';
import CadastrarLotes from './Pages/CadastroLotes';
import Notification from './Components/Notification.jsx';

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
        <Notification/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="sticky-top">
          <NavigationBar />
        </div>
        <div style={{ width: '100%', height: '92vh', overflow: 'auto' }}>
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
              path="/cadastrolotes"
              element={<CadastrarLotes />}
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
        <Notification/>
      </div>
    );
  }
}

export default App;
