import { MedidorConsumo } from './medidor-consumo';

export class ValorMedidorConsumo {
    medidor: MedidorConsumo;
    unidadeMedida: string;
    dataLeituraAnterir: Date;
    dataLeituraAtual: Date;
    idLeituraAtual: number;
    numeroAnterior: number;
    numeroAtual: number;
    quantidade: number;
    valor: number;
}
