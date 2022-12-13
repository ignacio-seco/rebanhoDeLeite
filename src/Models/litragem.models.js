const litragemSchema =  {
  creator: "",
  _id: "",
  uuid:"",
  animal: "",
  animaluuid:"",
    qtdLitros:"",
    dtVerificacao:"",
    dadosServidor: {
      colecao: 'litragem',
      relacao: 'cow',
      referencia:'producaoLeite',
      populaveis:[],
      lastUpdate:"",
      deletado:false
    },
  }
export default litragemSchema;
