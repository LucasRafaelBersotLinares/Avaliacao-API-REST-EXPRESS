import {Endereco} from "./endereco"

export class Fabricante {
    nome: string
    endereco: Endereco

    constructor(nome: string, endereco: Endereco){
        this.nome = nome
        this.endereco = endereco
    }
}