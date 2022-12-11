const tarefaSchema = {
  creator: "",
  uuid: "",
  dtCriacao: "",
  urgente: false,
  descricao: "",
  concluida: false,
  dadosServidor: {
    colecao: "tarefa",
    relacao: "propriedade",
    referencia: "tarefas",
    lastUpdate: "",
    deletado: false,
  },
};
export default tarefaSchema;
