import "./HomePage.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import rebanho from "../assets/AllCattlePhoto.jpg";
import curral from "../assets/curral.jpg";
import novoAnimal from "../assets/newAnimal.jpg";
import relatorios from "../assets/relatorio.jpg";
import monitoramento from "../assets/monitoramento.jpeg";
import cadastroPastos from "../assets/CadastroPastos.jpg";
import financasIcon from "../assets/Financas.jpg"
import todopage from "../assets/tarefas.png"

import { Link } from "react-router-dom";

function HomePage() {
  const cardImageStyle = { width: "auto" };

  return (
    <Container className="mt-4">
      <Row
        xs={1}
        md={1}
        lg={3}
        xl={4}
        className="presentation-page g-4"
      >
        <Col>
          <Link to={`/gado`}>
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={rebanho}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Seu Rebanho</h3>
                </Card.Title>
                <Card.Text>
                  Aqui você checa e altera dados do seu rebanho atual
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
                src={curral}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Curral</h3>
                </Card.Title>
                <Card.Text>Checar e alterar o gado do curral</Card.Text>
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
                src={novoAnimal}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Novo animal</h3>
                </Card.Title>
                <Card.Text>Cadastrar um novo animal no rebanho</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/cadastropasto">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={cadastroPastos}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Cadastro de pastos</h3>
                </Card.Title>
                <Card.Text>Cadastre aqui os pastos da propriedade </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/financas">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={financasIcon}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Finanças</h3>
                </Card.Title>
                <Card.Text>Dados da saúde financeira da propriedade</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/tarefas">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={todopage}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Tarefas</h3>
                </Card.Title>
                <Card.Text>
                  Registre as tarefas que necessita realizar na propriedade e não se esqueça de nada
                </Card.Text>
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
                src={relatorios}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Relatórios</h3>
                </Card.Title>
                <Card.Text>Visualizar relatórios sobre seu rebanho</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/monitoramento">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={monitoramento}
              />
              <Card.Body>
                <Card.Title>
                  <h3>Monitoramentos</h3>
                </Card.Title>
                <Card.Text>
                  Realizar atualização de informações monitoradas do rebanho
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default HomePage;
