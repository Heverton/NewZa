export class MenuItem {
    nome: string;
    descricao: string;
    url: string;
    icone: string;

    constructor(nome, descricao, url, icone){
        this.nome = nome;
        this.descricao = descricao;
        this.url = url;
        this.icone = icone;
    }
}