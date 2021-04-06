import { MedidorConsumo } from './medidor-consumo';

export class ValorConsumo {
    medidor: MedidorConsumo;
    unidadeMedida: string;
    dataLeituraAnterir: Date;
    dataLeituraAtual: Date;
    numeroAnterior: number;
    numeroAtual: number;
    quantidade: number;
    valor: number;
}
