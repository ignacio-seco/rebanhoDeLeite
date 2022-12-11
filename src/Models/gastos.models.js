const gastoSchema = {
  creator: "",
  uuid: "",
  dtGasto: "",
  valor: "",
  descricao: "",
  dadosServidor: {
    colecao: "gastos",
    relacao: "propriedade",
    referencia: "gastos",
    lastUpdate: "",
    deletado: false,
  },
};

export default gastoSchema;
