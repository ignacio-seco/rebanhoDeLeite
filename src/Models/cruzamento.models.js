const cruzamentoSchema ={
    creator: "",
    _id: "",
    uuid:"",
    animal: "",
    animaluuid:"",
    semen:'não informado',
    dtCruzamento:"",
    confirmacaoPrenhez:false,
    dtProvavelNascimento:"",
    dadosServidor: {
      colecao:'cruzamento',
      relacao:'cow',
      referencia:'dadosCruzamento',
      populaveis:[],
      lastUpdate:"",
      deletado: false
    },
  }
export default cruzamentoSchema;