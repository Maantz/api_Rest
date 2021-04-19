const moment = require('moment')
const axios = require('axios')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimento')
const { buscaPorId } = require('../repositorios/atendimento')

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao)
            this.clienteEhValido = ({tamanho}) => tamanho >= 5

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }
    
    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length
        
        if(existemErros){
            return new Promise((resolve,reject)=>reject(erros))
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            return repositorio.adiciona(atendimentoDatado).then(resultados=>
            {
                    const id = resultados.insertId
                    return {...atendimento, id}
            })
        }   
    }

    listas() {
       return repositorio.lista()
    }

    buscaPorId(id,resultados) {        
        return repositorio.buscaPorId(id)
    }
    

    altera(valores, id){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        return repositorio.altera(valores, id)
    }

    deleta(id,resultados) {
        return repositorio.deleta(id,resultados)
    }
}

module.exports = new Atendimento