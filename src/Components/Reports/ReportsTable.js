import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { calculateAge, formatDate } from "../../helpers/CalculateAge";

export default function ReportsTable({ data }) {
  return (
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
            <th>Nascimento</th>
            <th>Idade</th>
            <th>Está no curral?</th>
            <th>Pasto</th>
            <th>Último peso</th>
            <th>Data pesagem</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cow) => {
            return (
              <tr key={cow.uuid}>
                <td>{cow.brinco}</td>
                <td>
                  <Link to={`/gado/${cow.uuid}`}>{cow.nome}</Link>
                </td>
                <td>{cow.sexo}</td>
                <td>{cow.dtNascimento ? formatDate(cow.dtNascimento) : `-`}</td>
                <td>{calculateAge(cow.dtNascimento)}</td>
                <td>{cow.noCurral ? `Sim` : `Não`}</td>
                <td>{cow.pasto}</td>
                <td>
                  {cow.pesagem.length > 0
                    ? cow.pesagem[cow.pesagem.length - 1].peso
                    : `-`}
                </td>
                <td>
                  {cow.pesagem.length > 0
                    ? formatDate(cow.pesagem[cow.pesagem.length - 1].dtPesagem)
                    : `-`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
