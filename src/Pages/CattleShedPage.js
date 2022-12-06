import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CattleList from "../Components/CattleList/CattleList";

export default function CattleShedPage({ cattle, getCattle, loading }) {
  const cowFilter = (cow) => cow.noCurral === true;

  return (
    <div>
      <CattleList
        cattle={cattle}
        getCattle={getCattle}
        loading={loading}
        cowFilterFn={cowFilter}
      />
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
