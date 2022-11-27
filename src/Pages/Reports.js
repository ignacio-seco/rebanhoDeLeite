import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import rebanhoDetalhado from "../assets/detalhes.jpg";
import perdas from "../assets/dead.jpg";
import vendas from "../assets/Lucro.jpg";
import bezerros from "../assets/bezerros.jpg";
import pastos from "../assets/Pasto.jpg";
import { Link } from "react-router-dom";

function Reports() {
  const cardImageStyle = { width: "auto" };

  return (
    <Container className="mt-4">
      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
        className="presentation-page g-4"
      >
        <Col>
          <Link to={`/relatorios/rebanhodetalhado`}>
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
          <Link to={`/relatorios/perdas`}>
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
                <Card.Text>Animais que se foram...</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to={`/relatorios/vendas`}>
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
          <Link to="/relatorios/bezerros">
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
          <Link to="/relatorios/pastos">
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
