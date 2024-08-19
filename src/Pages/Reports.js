import './HomePage.css';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import rebanhoDetalhado from '../assets/detalhes.jpg';
import perdas from '../assets/dead.jpg';
import vendas from '../assets/Lucro.jpg';
import bezerros from '../assets/bezerros.jpg';
import pastos from '../assets/Pasto.jpg';
import nascimentos from '../assets/Nascimentos.jpg';
import observados from '../assets/animais em observacao.png';
import { Link } from 'react-router-dom';

function Reports() {
  const cardImageStyle = { width: 'auto' };

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
          <Link to="/relatorios/observados">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={observados}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Observados</h1>
                </Card.Title>
                <Card.Text>Animais que estão sob observação especial</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/relatorios/nascimentos">
            <Card>
              <Card.Img
                style={cardImageStyle}
                variant="top"
                src={nascimentos}
              />
              <Card.Body>
                <Card.Title>
                  <h1>Gestação</h1>
                </Card.Title>
                <Card.Text>Ver próximos nascimentos na propriedade</Card.Text>
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
                  <h1>Filtro Avançado</h1>
                </Card.Title>
                <Card.Text>Filtre animais por sexo, peso e idade</Card.Text>
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
      </Row>
    </Container>
  );
}
export default Reports;
