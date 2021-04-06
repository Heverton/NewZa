import { MedidorConsumo } from './medidor-consumo';

export class ValorConsumo {
    medidor: MedidorConsumo;
    unidadeMedida: string;
    dataLeitura: Date;
    quantidade: number;
    valor: number;
}
