export class TipoMedidorConsumo {
    id: number;
    descricao: string;

    calculoAgua(valor: number){
        if (valor <= 1){
          return 8;
        }

        let grupo1 = 0;
        let grupo2 = 0;
        let grupo3 = 0;
        for (let i = 1; i <= valor; i++){
          // 1 até 7
          if (i <= 7) {
            grupo1++;
          // 8 até 13
          } else if (i <= 13) {
            grupo2++;
          // > 14
          } else if (i > 14) {
            grupo3++;
          }
        }
        return (grupo1 * 2.99) + (grupo3 * 3.59) + (grupo3 * 7.10);
      }

    calculoLuz(valor: number){
        return valor * 0.90;
    }
}
