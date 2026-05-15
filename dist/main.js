"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produto_1 = require("./classes/produto");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
const produtos = [];
function novoProduto(req, res) {
    try {
        let data = req.body;
        let produtoDup = produtos.find(p => p.id == Number(data.id));
        if (!data.id || !data.nome || !data.fabricante || !data.preco) {
            throw new Error("Produto requer id, nome, fabricante e preço");
        }
        if (!data.fabricante.nome || !data.fabricante.endereco.cidade || !data.fabricante.endereco.pais) {
            throw new Error("Produto requer nome de fabricante, endereco com pais válido e endereco com cidade válida");
        }
        if (produtoDup) {
            throw new Error("Não é permitido ID duplicados");
        }
        if (!(data.preco > 0)) {
            throw new Error("Preço tem que ser maior que zero");
        }
        const produto = new produto_1.Produto(data.id, data.nome, data.preco, data.fabricante);
        produtos.push(produto);
        res.status(201).json(produto);
    }
    catch (erro) {
        res.status(400).json({ Message: erro.message });
    }
}
function listaProdutos(req, res) {
    try {
        if (produtos) {
            res.status(200).json(produtos);
        }
    }
    catch (erro) {
        res.status(400).json({ Message: erro.message });
    }
}
function buscarPorID(req, res) {
    try {
        let id = Number(req.params.id);
        let produto = produtos.find(p => p.id == id);
        if (produto) {
            res.status(200).json({ produto });
        }
        throw new Error("Produto não encontrado");
    }
    catch (erro) {
        res.status(404).json({ Message: erro.message });
    }
}
function atualizaDados(req, res) {
    try {
        let id = Number(req.params.id);
        let data = req.body;
        let produto = produtos.find(p => p.id == id);
        let produtoDup = produtos.find(p => p.id == data.id);
        if (produto) {
            if (!produtoDup) {
                produto.id = data.id ?? produto.id;
            }
            else {
                throw new Error("Não pode colocar ID duplicados");
            }
            produto.nome = data?.nome ?? produto.nome;
            produto.preco = data?.preco ?? produto.preco;
            produto.fabricante.nome = data.fabricante?.nome ?? produto.fabricante.nome;
            produto.fabricante.endereco.cidade = data.fabricante.endereco?.cidade ?? produto.fabricante.endereco.cidade;
            produto.fabricante.endereco.pais = data.fabricante.endereco?.pais ?? produto.fabricante.endereco.pais;
            res.status(200).json({ produto });
        }
        throw new Error("Não achou o produto para atualizar");
    }
    catch (erro) {
        res.status(404).json({ Message: erro.message });
    }
}
function deletaDado(req, res) {
    try {
        let id = Number(req.params.id);
        let produto = produtos.findIndex(p => p.id == id);
        if (produto > -1) {
            produtos.splice(produto, 1);
            res.status(200).json({ produtos });
        }
        throw new Error("Produto não encontrado");
    }
    catch (erro) {
        res.status(404).json({ Message: erro.message });
    }
}
app.delete('/api/produtos/delete/:id', deletaDado);
app.put('/api/produtos/atualizar/:id', atualizaDados);
app.get('/api/produtos/lista/:id', buscarPorID);
app.get('/api/produtos/lista', listaProdutos);
app.post('/api/produtos/adicionar', novoProduto);
app.listen(PORT, () => console.log("API ESTA NA PORTA: ", PORT));
//# sourceMappingURL=main.js.map