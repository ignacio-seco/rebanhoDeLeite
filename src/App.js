import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCattle from "./Components/AddCattle/AddCattle";
import AnimalDetail from "./Components/AnimalDetail/AnimalDetail";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import HomePage from "./Pages/HomePage";
import CattleHerdPage from "./Pages/CattleHerdPage";
import CattleShedPage from "./Pages/CattleShedPage";
import Reports from "./Components/Reports/Reports";

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
      <div>
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
            path="/gado/:_id"
            element={<AnimalDetail />}
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
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
