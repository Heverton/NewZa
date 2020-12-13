import { Data } from '@angular/router';

export class Aviso {
    id: number;
    nome: string;
    descricao: string;
    dtCriacao: Data;
    dtExpiracao: Data;
}
