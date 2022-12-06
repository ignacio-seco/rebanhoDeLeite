import { useEffect, useState } from "react";
import { Container, Form, FormLabel } from "react-bootstrap";
import ReportsTable from "../../Components/Reports/ReportsTable";

export default function Pastos({ cattle, getCattle, pasturesArray}) {
  const [pasture, setPasture] = useState("");
  useEffect(getCattle, [cattle.length]);

  const sortedCattle = (searchedPasture) => {
    return cattle
      .filter(
        (cow) => !(cow.dadosMorte.morreu || cow.dadosVenda.vendida) && cow.pasto === searchedPasture
      )
      .sort((a, b) => Number(a.brinco) - Number(b.brinco));
  };

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
      <Container>
        <h2 style={{ textAlign: "center" }}>Animais por pasto</h2>
        <h5>
          {pasture === "Selecione um pasto"
            ? "Selecione um pasto"
            : pasture === ""
            ? `Animais sem pasto atribuído: ${sortedCattle(pasture).length}`
            : `Animais no pasto ${pasture}: ${sortedCattle(pasture).length}`}
        </h5>
        <FormLabel>Selecione um pasto</FormLabel>
        <Form.Select
          aria-label="Pastos da propriedade"
          onChange={(e) => setPasture(e.currentTarget.value)}
          value=""
        >
          {pasturesArray.map((p, i) => (
            <option key={i}>{p}</option>
          ))}
        </Form.Select>
      </Container>
      <ReportsTable data={sortedCattle(pasture)} />
    </div>
  );
}
