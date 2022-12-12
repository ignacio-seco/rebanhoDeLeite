import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CattleList from "../Components/CattleList/CattleList";

export default function CattleShedPage() {
  const cowFilter = (cow) => cow.noCurral === true;

  return (
    <div>
      <CattleList cowFilterFn={cowFilter} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/monitoramento/monitoramentoleite">
          <Button>Realizar monitoramento de produção de leite</Button>
        </Link>
      </div>
    </div>
  );
}
