import { Data } from '@angular/router';

export class Aviso {
    id: number;
    nome: string;
    descricao: string;
    dtCriacao: Data;
    dtExpiracao: Data;

    constructor(nome, descricao, dtCriacao, dtExpiracao){
        this.nome = nome;
        this.descricao = descricao;
        this.dtCriacao = dtCriacao;
        this.dtExpiracao = dtExpiracao;
    }
}
