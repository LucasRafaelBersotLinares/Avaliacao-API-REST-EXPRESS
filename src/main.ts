import express, {Request, Response} from "express"
import {Produto} from "./classes/produto"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

const produtos: Produto[] = []
function novoProduto(req: Request, res: Response){
    try {
        let data: any = req.body

        if(!data.nome || !data.fabricante || !data.preco) {
            throw new Error("Produto requer nome, fabricante e preco")
        }
        const produto = new Produto(data.id,data.nome,data.preco,data.fabricante)
        produtos.push(produto)
        res.status(200).json(produto)
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
        let id:any = req.params.id
        produtos.find(id)
        throw new Error("Produto não encontrado")

    } catch(erro: unknown){
        res.status(404).json({Message: (erro as Error).message})
    }
}

function atualizaDados(req: Request, res: Response){
    try {
        let id:any = Number(req.params.id)
        let data:any = req.body

        let produto = produtos.findIndex(p => 
            p.id == id
        )

        throw new Error("Não achou o produto para atualizar")
    } catch(erro: unknown){
        res.status(400).json({Message: (erro as Error).message})
    }
}

app.put('/api/produtos/atualizar/:id', atualizaDados)
app.get('/api/produtos/lista/:id', buscarPorID)
app.get('/api/produtos/lista', listaProdutos)
app.post('/api/produtos', novoProduto)
app.listen(PORT, () => console.log("API ESTA NA PORTA: ", PORT))