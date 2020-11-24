export class Energia {
    nomeinquilino: string;
    numeromedidor: string;
    numeroalterior: number;
    numeroatual: number;
    dataleitura: string;

    constructor(nomeinquilino, numeromedidor, numeroalterior, numeroatual, dataleitura){
        this.nomeinquilino = nomeinquilino;
        this.numeromedidor = numeromedidor;
        this.numeroalterior = numeroalterior;
        this.numeroatual = numeroatual;
        this.dataleitura = dataleitura;
    }
}