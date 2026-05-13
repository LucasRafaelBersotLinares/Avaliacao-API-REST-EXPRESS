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
        if (!data.nome || !data.fabricante || !data.preco) {
            throw new Error("Produto requer nome, fabricante e preco");
        }
        const produto = new produto_1.Produto(data.id, data.nome, data.preco, data.fabricante);
        produtos.push(produto);
        res.status(200).json(produto);
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
app.get('/api/produtos/lista', listaProdutos);
app.post('/api/produtos', novoProduto);
app.listen(PORT, () => console.log("API ESTA NA PORTA: ", PORT));
//# sourceMappingURL=main.js.map