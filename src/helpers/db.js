import Dexie from 'dexie'

export const db = new Dexie ('controleRural')

db.version(1).stores({propriedade:'++id, _id, nome, rebanho, pastos, controleFinanceiro, tarefas, revTime, dataRevision, oldId, backupVersion'})