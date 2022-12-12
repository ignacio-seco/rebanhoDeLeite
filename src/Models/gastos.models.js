const gastoSchema = {
  creator: "",
  _id: "",
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
