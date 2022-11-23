import { useEffect } from "react";
import ReportsTable from "../../Components/Reports/ReportsTable";

export default function RebanhoDetalhado({ cattle, getCattle }) {
  useEffect(getCattle, []);
  const sortedCattle = () => {
    return cattle
      .filter((cow) => !(cow.morreu || cow.vendida))
      .sort((a, b) => Number(a.brinco) - Number(b.brinco));
  };

  return (
    <div style={{ width: "100%", height: "90vh", overflow: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Relatório de rebanho detalhado</h2>

      <ReportsTable data={sortedCattle()} />
    </div>
  );
}
