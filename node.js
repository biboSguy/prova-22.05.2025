import express from 'express'
import fs from 'fs'

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    res.status(200).json({msg:"Tudo Ok"})
})

server.post('/logs', (req, res) => {
    const {id_unico_aleatorio, data_hora_criacao, nome} = req.body

    fs.readFile('logs.txt', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({erro:err})
        } else {
            const lista = JSON.parse(data)
            const novaTarefa = {
                id: Date.now().toString(), 
                id_unico_aleatorio,
                data_hora_criacao,
                nome,
            }

            lista.push(novaTarefa)

            fs.writeFile('logs.txt', JSON.stringify(lista, null, 2), (err) => {
                if(err){
                    res.status(500).json({erro:err})
                } else {
                    res.status(201).json(novaTarefa)
                }
            })
        }
    })
})












server.listen(8080, () => {
    console.log('Servidor rodando na porta 8080')
})