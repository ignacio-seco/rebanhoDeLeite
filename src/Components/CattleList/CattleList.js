import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { calculateAge } from "../../helpers/CalculateAge";
import "./CattleList.css";

function CattleList({ cattle, getCattle }) {
  useEffect(getCattle, []);

  const renderCattle = cattle.map((e) => {
    return (
      <div
        className="BeerCard"
        key={e._id}
      >
        <div className="imageHolder">
          <Link to={`./${e._id}`}>
            <img
              src={e.imagem_url}
              alt={e.nome}
            />
          </Link>
        </div>
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span className="BoldStyle">Brinco</span> {e.brinco}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="BoldStyle">nome</span>
              {e.nome}
            </ListGroup.Item>
            <ListGroup.Item>{calculateAge(e.nascimento)}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  });
  return <div>{renderCattle}</div>;
}
export default CattleList;
