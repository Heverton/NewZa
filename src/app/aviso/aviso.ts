export class Aviso {
    nome: string;
    descricao: string;
    dtCriacao: string;
    dtExpiracao: string;

    constructor(nome, descricao, dtCriacao, dtExpiracao){
        this.nome = nome;
        this.descricao = descricao;
        this.dtCriacao = dtCriacao;
        this.dtExpiracao = dtExpiracao;
    }
}
