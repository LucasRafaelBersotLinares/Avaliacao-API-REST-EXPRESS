import {Fabricante} from "./fabricante"

export class Produto {
    id: number
    nome: string
    preco: number
    fabricante: Fabricante

    constructor(id: number, nome: string, preco: number, fabricante: Fabricante){
        this.id = id
        this.nome = nome
        this.preco = preco
        this.fabricante = fabricante
    }
}