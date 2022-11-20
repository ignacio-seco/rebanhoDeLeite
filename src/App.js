import axios from "axios";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCattle from "./Components/AddCattle/AddCattle";
import AnimalDetail from "./Components/AnimalDetail/AnimalDetail";
import CattleList from "./Components/CattleList/CattleList";
import CattleShed from "./Components/CattleShed/CattleShed";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import HomePage from "./Pages/HomePage";

function App() {
  const [cattle, setCattle] = useState([]);

  function getCattle() {
    axios
      .get()
      .then((response) => setCattle(response.data))
      .catch(() => console.log("Something went wrong"));
  }

  return (
    <div className="App">
      <div>
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
              <CattleList
                cattle={cattle}
                getCattle={getCattle}
              />
            }
          />
          <Route
            path="/curral"
            element={
              <CattleShed
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
