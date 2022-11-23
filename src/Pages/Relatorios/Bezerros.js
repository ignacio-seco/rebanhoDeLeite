import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ReportsTable from "../../Components/Reports/ReportsTable";
import { filterMonths } from "../../helpers/CalculateAge";

export default function Bezerros({ cattle, getCattle }) {
  const [mesesMax, setMesesMax] = useState(120);
  const [mesesMin, setMesesMin] = useState(0);

  useEffect(getCattle, []);
  const sortedCattle = (min, max) => {
    return cattle
      .filter(
        (cow) =>
          !(cow.morreu || cow.vendida) &&
          filterMonths(cow.dtNascimento) > min - 1 &&
          filterMonths(cow.dtNascimento) < max + 1
      )
      .sort(
        (a, b) => filterMonths(a.dtNascimento) - filterMonths(b.dtNascimento)
      );
  };

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
      <Container>
        <h2 style={{ textAlign: "center" }}>Animais por idade</h2>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Idade mínima (meses)</Form.Label>
              <Form.Control
                type="number"
                value={mesesMin}
                onChange={(e) => setMesesMin(Number(e.currentTarget.value))}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Idade máxima (meses)</Form.Label>
              <Form.Control
                type="number"
                value={mesesMax}
                onChange={(e) => setMesesMax(Number(e.currentTarget.value))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>

      <ReportsTable data={sortedCattle(mesesMin, mesesMax)} />
    </div>
  );
}
