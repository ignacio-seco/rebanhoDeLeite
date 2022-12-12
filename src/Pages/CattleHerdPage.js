import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CattleList from "../Components/CattleList/CattleList";

export default function CattleHerdPage() {
  return (
    <div>
      <CattleList />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/monitoramento/monitoramentopeso">
          <Button>Realizar monitoramento de peso dos animais</Button>
        </Link>
      </div>
    </div>
  );
}
