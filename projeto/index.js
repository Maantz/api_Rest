const customExpress = require('./config/customexpress')//importando arquivo para obter as configuraçoes da function app que contem express
const conexao = require('./infraestrutura/database/conexao')
const tabelas = require('./infraestrutura/database/tabelas')
conexao.connect( erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log('Conectado com sucesso')
        tabelas.init(conexao)
        const app = customExpress()//transformando app numa função que tem as configurações presentes em customExpress

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))//Imprimindo para saber se deus certo

    }
})

