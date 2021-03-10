import { Data } from '@angular/router';
import { Imovel } from '../imovel/imovel';
import { Login } from '../login/login';
import { EstadoCivil } from './estadocivil';

export class Inquilino {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    sexo: string;
    dtNascimento: Data;

    estadoCivil: EstadoCivil;
    imovel: Imovel;
    login: Login;

    isPossuiFilhos = false;
    isPossuiWhatsapp = false;

    nomeConjuge: string;
    sexoConjuge: string;
    dtNascimentoConjuge: string;
}
