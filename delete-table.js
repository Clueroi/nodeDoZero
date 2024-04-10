import  sql  from './db.js'

sql`DROP TABLE IF EXISTS video;`.then(()=>{
    console.log('tabela apagada')
})