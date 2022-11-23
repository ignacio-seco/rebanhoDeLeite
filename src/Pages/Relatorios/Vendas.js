import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { filterMonths, formatDate } from "../../helpers/CalculateAge";

export default function Vendas({ cattle, getCattle }) {
  useEffect(getCattle, []);
  const sortedCattle = () => {
    return cattle
      .filter((cow) => cow.vendida)
      .sort((a, b) => filterMonths(a.dtVenda) - filterMonths(b.dtVenda));
  };

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Cabeças vendidas</h2>

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
              <th>Data da venda</th>
              <th>Valor da venda</th>
              <th>Comprador</th>
              <th>Último peso registrado</th>
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
                  <td>{cow.dtVenda ? formatDate(cow.dtVenda) : `-`}</td>
                  <td>{cow.valorVenda}</td>
                  <td>{cow.comprador}</td>
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
