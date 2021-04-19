const atendimento = require('../controllers/atendimento')
const query = require('../infraestrutura/database/queries')
const axios = require('axios')

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?'
        return query(sql,atendimento)
    }

    lista(){
        const sql = 'SELECT * FROM Atendimentos'

        return query(sql)
    }

    buscaPorId(id){
         const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

         return query(sql,id)
    }

    deleta(id){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        return query(sql,id)
    }

    altera(valores, id){
        const sql = `UPDATE Atendimentos SET? WHERE id=${id}`
        return query(sql,[valores,id])
    }
}

module.exports = new Atendimento()