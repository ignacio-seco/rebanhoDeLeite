const litragemSchema =  {
    creator: "",
    uuid: "",
    animal: "",
    qtdLitros:"",
    dtVerificacao:"",
    dadosServidor: {
      colecao: 'litragem',
      relacao: 'cow',
      referencia:'producaoLeite',
      lastUpdate:"",
      deletado:false
    },
  }
export default litragemSchema;
