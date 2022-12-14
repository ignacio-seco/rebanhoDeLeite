import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import lucro from "../assets/Lucro2.jpg"
import gastos from "../assets/gastos.jpg"
import graficoFinanceiro from "../assets/graficos-02-1200x488.jpg"
import { Link } from "react-router-dom";

export default function Finances() {
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
          <Link to={`/financas/ganhos`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={lucro}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Ganhos</h1>
                </Card.Title>
                <Card.Text>
                  Registrar valores recebidos com a atividade da propriedade
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to={`/financas/gastos`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={gastos}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Custos</h1>
                </Card.Title>
                <Card.Text>Registrar os custos da propriedade</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to={`/financas/balanco`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={graficoFinanceiro}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Graficos</h1>
                </Card.Title>
                <Card.Text>Visão geral das finanças da propriedade</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

    </Container>
  );
}