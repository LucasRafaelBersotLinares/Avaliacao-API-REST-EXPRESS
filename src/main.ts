import express, {Request, Response} from "express"
import {Produto} from "./classes/produto"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

const produtos: Produto[] = []
function novoProduto(req: Request, res: Response){
    try {
        let data: any = req.body
        let produtoDup = produtos.find(p => p.id == Number(data.id))

        if(!data.id||!data.nome || !data.fabricante || !data.preco) {
            throw new Error("Produto requer id, nome, fabricante e preço")
        }
        if(!data.fabricante.nome || !data.fabricante.endereco.cidade || !data.fabricante.endereco.pais){
            throw new Error("Produto requer nome de fabricante, endereco com pais válido e endereco com cidade válida")
        }
        if(produtoDup){
            throw new Error("Não é permitido ID duplicados")
        }
        if(!(data.preco > 0)){
            throw new Error("Preço tem que ser maior que zero")
        }
        const produto = new Produto(data.id,data.nome,data.preco,data.fabricante)
        produtos.push(produto)
        res.status(201).json(produto)
    } catch(erro: unknown) {
        res.status(400).json({Message: (erro as Error).message})
    }
}

function listaProdutos(req: Request, res: Response){
    try {
        if(produtos){
            res.status(200).json(produtos)
        }
    } catch(erro: unknown) {
        res.status(400).json({Message: (erro as Error).message})
    }
}

function buscarPorID(req: Request, res: Response){
    try {
        let id:any = Number(req.params.id)
        let produto = produtos.find(p => p.id == id)
        if(produto){
            res.status(200).json({produto})
        }
        throw new Error("Produto não encontrado")

    } catch(erro: unknown){
        res.status(404).json({Message: (erro as Error).message})
    }
}

function atualizaDados(req: Request, res: Response){
    try {
        let id:any = Number(req.params.id)
        let data:any = req.body

        let produto = produtos.find(p => p.id == id)
        if(produto){
            produto.id = data.id ?? produto.id
            produto.nome = data.nome ?? produto.nome
            produto.preco = data.preco ?? produto.preco
            produto.fabricante.nome = data.fabricante.nome ?? produto.fabricante.nome
            produto.fabricante.endereco.cidade = data.fabricante.endereco.cidade ?? produto.fabricante.endereco.cidade
            produto.fabricante.endereco.pais = data.fabricante.endereco.pais ?? produto.fabricante.endereco.pais
            res.status(200).json({produto})
        }
        throw new Error("Não achou o produto para atualizar")
    } catch(erro: unknown){
        res.status(404).json({Message: (erro as Error).message})
    }
}

function deletaDado(req: Request, res: Response){
    try {
        let id = Number(req.params.id)
        let produto = produtos.findIndex(p => p.id == id)
        if(produto > -1){
            produtos.splice(produto,1)
            res.status(200).json({produtos})
        }
        throw new Error("Produto não encontrado")
    } catch(erro: unknown){
        res.status(404).json({Message: (erro as Error).message})
    }
}

app.delete('/api/produtos/delete/:id', deletaDado)
app.put('/api/produtos/atualizar/:id', atualizaDados)
app.get('/api/produtos/lista/:id', buscarPorID)
app.get('/api/produtos/lista', listaProdutos)
app.post('/api/produtos/adicionar', novoProduto)
app.listen(PORT, () => console.log("API ESTA NA PORTA: ", PORT))