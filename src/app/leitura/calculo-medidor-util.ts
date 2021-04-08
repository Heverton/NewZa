
export class CalculoMedidorUtil {

  /**
   * Seguindo a o contrado firmado.
   * @param valor number
   * @returns valor monetário
   */
  calculoLuz(valor: number){
    return valor * 0.90;
  }

  /**
   * Seguindo a recomendação;
   * https://www.caesb.df.gov.br/tarifas-e-precos.html
   * @param valor number
   * @returns valor monetário
   */
  calculoAgua(valor: number): number{
    if (valor <= 1){
        return 8;
    }

    const unidadeConsumoCeb = 4;
    // Deve ser no mínimo um. Quando mudar a regra unidadeConsumo para 8 ou 9 remover a unidadeConsumoLocal.
    const unidadeConsumoLocal = 9;

    const grupos = new Array<number>();
    const tabelaCompaniaAgua = [2.99, 3.59, 7.10, 10.66, 17.05, 23.87];
    const resultado = new Array<number>();

    let grupo = 0;
    let formula = 0;
    while (valor > 0){
        switch (grupo) {
            case 0:
                formula = ((7 * unidadeConsumoCeb) / unidadeConsumoLocal);
                grupos.push(this.prepararCalculoAgua(valor, formula));
                valor = this.prepararCalculoAguaRedutor(valor, formula);
                break;
            case 1:
                formula = ((6 * unidadeConsumoCeb) / unidadeConsumoLocal);
                grupos.push(this.prepararCalculoAgua(valor, formula));
                valor = this.prepararCalculoAguaRedutor(valor, formula);
                break;
            case 2:
                formula = ((7 * unidadeConsumoCeb) / unidadeConsumoLocal);
                grupos.push(this.prepararCalculoAgua(valor, formula));
                valor = this.prepararCalculoAguaRedutor(valor, formula);
                break;
            case 3:
                formula = ((10 * unidadeConsumoCeb) / unidadeConsumoLocal);
                grupos.push(this.prepararCalculoAgua(valor, formula));
                valor = this.prepararCalculoAguaRedutor(valor, formula);
                break;
            case 4:
                formula = ((15 * unidadeConsumoCeb) / unidadeConsumoLocal);
                grupos.push(this.prepararCalculoAgua(valor, formula));
                valor = this.prepararCalculoAguaRedutor(valor, formula);
                break;
            case 5:
                grupos.push(valor);
                valor = 0;
                break;
        }
        grupo++;
    }

    for (let i = 0; i < grupos.length; i++) {
      let tabela = 0;
      if ( i >= 6 ) {
          tabela = tabelaCompaniaAgua[tabelaCompaniaAgua.length];
      } else {
          tabela = tabelaCompaniaAgua[i];
      }
      resultado.push(grupos[i] * tabela);
    }

    let esgotoAgua = 0;
    resultado.forEach(d => {
      esgotoAgua += d;
    });

    esgotoAgua = esgotoAgua * 2;
    return esgotoAgua;
  }

  private prepararCalculoAgua(valor: number, formula: number): number{
    let resultado = valor - formula;
    if (resultado <= 0){
      resultado = valor;
    } else {
      resultado = formula;
    }
    return resultado;
  }

  private prepararCalculoAguaRedutor(valor: number, formula: number): number{
    return (valor - formula > 0) ? valor - formula : 0;
  }
}
