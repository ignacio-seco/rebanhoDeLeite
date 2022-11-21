import { useEffect, useMemo, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { calculateAge, stringEqualizer } from "../../helpers/CalculateAge";
import "./CattleList.css";

function CattleList({ cattle, getCattle }) {
  let search = "";
  useEffect(getCattle, []);
  console.log(cattle.length);

  let searchCattle = () => {
    return cattle
      .filter(
        (e) =>
          e.brinco.indexOf(search) !== -1 ||
          stringEqualizer(e.nome).indexOf(stringEqualizer(search)) !== -1)
      .sort((a, b) => Number(a.brinco) - Number(b.brinco))
      .map((e) => {
        return (
          <Container
            className="justify-content-center BeerCard"
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
            <Card style={{ width: "18rem", marginLeft: "0px" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span className="BoldStyle">Brinco: </span> {e.brinco}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="BoldStyle">nome: </span>
                  {e.nome}
                </ListGroup.Item>
                <ListGroup.Item>{calculateAge(e.nascimento)}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Container>
        );
      });
  };
  const [showCattle, setShowCattle] = useState(searchCattle);
  useEffect(() => {
    setShowCattle(searchCattle);
  }, [search]);
     useMemo(() => {
      setShowCattle(searchCattle);
    }, [cattle.length]);// isso fez o gado continuar sendo recarregado quando a página recebe um refresh

  return (
    <div className="justify-content-center">
      <div style={{ position: "sticky", display: "block" }}>
        <Container className="sticky-top">
          <Form.Control
            type="search"
            placeholder="Digite o nome ou nº de brinco"
            className="me-2"
            defaultValue={search}
            aria-label="Search"
            onChange={(e) => {
              search = e.currentTarget.value;
              setShowCattle(searchCattle);
            }}
          />
        </Container>
      </div>
      {showCattle}
    </div>
  );
}
export default CattleList;
