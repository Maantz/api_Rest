const Atendimento = require('../models/atendimentos')
const { buscaPorId } = require('../repositorios/atendimento')
const atendimento = require('../repositorios/atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) =>{
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, atendimento)
            .then(atendimento => (async(erros,resultados)=>{
                const cpf = atendimento.cliente
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
            })&&res.json(atendimento))
            .catch(erros => res.status(400).json(erros))   
    })

    app.post('/atendimentos', (req, res)=> {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => 
            res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(400).json(erros))
    })

    app.patch('/atendimentos/:id', async (req,res)=>{
        const id = parseInt(req.params.id)
        const valores = req.body

        try{
            const response = await Atendimento.altera(valores, id);
            console.log(response);
            return res.json(`alterado com sucesso`);
        }catch(erros){
            return res.status(500).json({error: true, message: erros.message})
        }
        
        // Atendimento.altera(valores,  id)
        //     .then(valores=>
        //         res.status.json({...valores, id}))
        //     .catch(erros => 
        //         res.status(400).json({erros}))
    })
    

    app.delete('/atendimentos/:id' , (req,res) => {
        const id = parseInt(req.params.id)
        Atendimento.deleta(id).then(resultados =>
             res.status(200).json({id})&&
             console.log(`Atendimento ${id} excluído com sucesso`))
            .catch(erros => res.status(400).json(erros))
        })
} //exportando a funcção app
