//usar o comando do windows run chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security para usar o localhost como servidor
import { useContext, useEffect, useState } from "react";
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
import Notification from "./Components/Notification";
import { AuthContext } from "./contexts/authContext";
import LandingPage from "./Pages/LandingPage";

function App() {
  
  const {
    loggedInUser,
    setLoggedInUser,
    data,
    setData,
    loading,
    setLoading,
    getData,
    getLoggedInUser,
  }= useContext(AuthContext)

  if(!loggedInUser){ return(
  <div>
    <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="*"
            element={<LandingPage />}
          />
   </Routes> 
   </div>
   )
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
            element={
              <CattleHerdPage
                cattle={data.rebanho}
                getCattle={getData}
                loading={loading}
              />
            }
          />
          <Route
            path="/curral"
            element={
              <CattleShedPage
                cattle={data.rebanho}
                getCattle={getData}
                loading={loading}
              />
            }
          />
          <Route
            path="/cadastrarAnimal"
            element={
              <AddCattle
                getCattle={getData}
                property={data}
              />
            }
          />
          <Route
            path="/gado/:id"
            element={
              <CattleDetailsPage
                cattle={data.rebanho}
                getCattle={getData}
                pasturesArray={data.pastos}
                property={data}
                loading={loading}
              />
            }
          />
          <Route
            path="/relatorios"
            element={
              <Reports
                cattle={data.rebanho}
                getCattle={getData}
              />
            }
          />
          <Route
            path="/relatorios/rebanhodetalhado"
            element={
              <RebanhoDetalhado
                cattle={data.rebanho}
                getCattle={getData}
              />
            }
          />
          <Route
            path="/relatorios/perdas"
            element={
              <Perdas
                cattle={data.rebanho}
                getCattle={getData}
              />
            }
          />
          <Route
            path="/relatorios/vendas"
            element={
              <Vendas
                cattle={data.rebanho}
                getCattle={data}
                loading={loading}
              />
            }
          />
          <Route
            path="/relatorios/bezerros"
            element={
              <Bezerros
                cattle={data.rebanho}
                getCattle={data}
                loading={loading}
              />
            }
          />
          <Route
            path="/relatorios/pastos"
            element={
              <Pastos
                cattle={data.rebanho}
                getCattle={getData}
                pasturesArray={data.pastos}
              />
            }
          />
          <Route
            path="/monitoramento"
            element={<Monitoring />}
          />
          <Route
            path="/monitoramento/monitoramentoleite"
            element={
              <MilkMonitoring
                cattle={data.rebanho}
                getCattle={getData}
                property={data}
                loading={loading}
              />
            }
          />
          <Route
            path="/monitoramento/monitoramentopeso"
            element={
              <WeightMonitor
                cattle={data.rebanho}
                getCattle={getData}
                property={data}
                loading={loading}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}}

export default App;
