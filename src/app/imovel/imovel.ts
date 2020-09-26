export class Imovel {
    nome: string;
    descricao: string;
    valor: string;
    sigla: string;
    qtdComodos: string;

    constructor(nome, descricao, valor){
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
    }
}