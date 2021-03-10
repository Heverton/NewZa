import { Leitura } from '../leitura/leitura';
import { MedidorConsumo } from '../leitura/medidor-consumo';

export class Imovel {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    sigla: string;
    qtdComodos: number;
    medidorConsumos: Array<MedidorConsumo>;
}
