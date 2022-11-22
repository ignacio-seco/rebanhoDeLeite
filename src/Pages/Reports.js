import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import rebanhoDetalhado from "../assets/detalhes.jpg";
import perdas from "../assets/dead.webp";
import vendas from "../assets/Lucro.webp";
import bezerros from "../assets/bezerros.jpg";
import pastos from "../assets/Pasto.jpg";
import { Link } from "react-router-dom";

function Reports() {
  const cardImageStyle = { width: "auto", height: "25vh" };

  return (
    <Container className="homePageLinks">
      <Row
        xs={1}
        md={1}
        lg={1}
        xl={3}
      >
      <Col>
          <Link to={`/gado`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={rebanhoDetalhado}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Rebanho detalhado</h1>
                </Card.Title>
                <Card.Text>
                  Planilha com informações detalhadas do rebanho
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to={`/gado`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={perdas}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Perdas</h1>
                </Card.Title>
                <Card.Text>
                  Animais que se foram...
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/curral">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={vendas}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Vendas</h1>
                </Card.Title>
                <Card.Text>Animais vendidos</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/cadastrarAnimal">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={bezerros}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Bezerros</h1>
                </Card.Title>
                <Card.Text>Filtrar animais pela idade</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/relatorios">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={pastos}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Pastos</h1>
                </Card.Title>
                <Card.Text>Ver animais por pasto</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default Reports;