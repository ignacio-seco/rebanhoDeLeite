import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { filterMonths, formatDate } from "../../helpers/CalculateAge";

export default function Perdas({ cattle, getCattle }) {
  useEffect(getCattle, []);
  const sortedCattle = () => {
    return cattle
      .filter((cow) => cow.morreu)
      .sort((a, b) => filterMonths(a.dtMorte) - filterMonths(b.dtMorte));
  };

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Perda de rebanho</h2>

      <Container>
        <Table
          striped
          bordered
          hover
        >
          <thead
            className="sticky-top"
            style={{ backgroundColor: "white" }}
          >
            <tr>
              <th>Brinco</th>
              <th>Nome</th>
              <th>Sexo</th>
              <th>Data da morte</th>
              <th>Causa da morte</th>
              <th>Último peso</th>
              <th>Data pesagem</th>
            </tr>
          </thead>
          <tbody>
            {sortedCattle().map((cow) => {
              return (
                <tr key={cow._id}>
                  <td>{cow.brinco}</td>
                  <td>
                    <Link to={`/gado/${cow._id}`}>{cow.nome}</Link>
                  </td>
                  <td>{cow.sexo}</td>
                  <td>{cow.dtMorte ? formatDate(cow.dtMorte) : `-`}</td>
                  <td>{cow.causaMorte}</td>
                  <td>
                    {cow.pesagem.length > 0
                      ? cow.pesagem[cow.pesagem.length - 1].peso
                      : `-`}
                  </td>
                  <td>
                    {cow.pesagem.length > 0
                      ? formatDate(
                          cow.pesagem[cow.pesagem.length - 1].dtPesagem
                        )
                      : `-`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
