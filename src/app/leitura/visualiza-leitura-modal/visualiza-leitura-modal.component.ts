import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeituraService } from 'src/app/shared/api/leitura.service';
import { Leitura } from '../leitura';
import { MedidorConsumo } from '../medidor-consumo';
import { ValorConsumo } from '../tipo-medidor-consumo';
import { TipoMedidorEnum } from '../tipo-medidor-enum';
import { TipoMedidorConsumo } from '../valor-consumo';

@Component({
  selector: 'app-visualiza-leitura-modal',
  templateUrl: './visualiza-leitura-modal.component.html',
  styleUrls: ['visualiza-leitura-modal.component.scss']
})
export class VisualizaLeituraModalComponent implements OnInit {

  @Input() item: MedidorConsumo;
  leituras = new Array<Leitura>();
  valorConsumo = new Array<ValorConsumo>();

  constructor(private service: LeituraService, private md: ModalController) {
  }

  ngOnInit(): void {
    this.service.buscarIdMedidor(this.item.id).subscribe(result => {
      this.leituras = result;

      this.leituras.sort((a: Leitura, b: Leitura) => {
        if (a.dataleitura > b.dataleitura) { return 1; }
        if (a.dataleitura < b.dataleitura) { return -1; }
        return 0;
      });

      let leituraAnterior: Leitura;
      let leituraAtual: Leitura;

      for (let i = 0; i <= this.leituras.length; i++){
        if (i === 0) {
          leituraAtual = this.leituras[i];
          const total = leituraAtual.numeroleitura;
          this.valorConsumo.push(this.prepararCalculo(leituraAtual, total));
        } else {
          const j = i - 1;
          leituraAnterior = this.leituras[j];
          leituraAtual = this.leituras[i];
          const total = leituraAtual.numeroleitura - leituraAnterior.numeroleitura;
          this.valorConsumo.push(this.prepararCalculo(leituraAtual, total));
        }
      }
    });
  }

  private prepararCalculo(leitura: Leitura, total: number): ValorConsumo {

    const valorConsumo = new ValorConsumo();
    valorConsumo.dataLeitura = leitura.dataleitura;
    valorConsumo.medidor = leitura.medidorConsumo;
    valorConsumo.quantidade = total;

    if (this.item.tipoMedidorConsumo.id === TipoMedidorEnum.LUZ) {
      valorConsumo.unidadeMedida = 'Kw';
      valorConsumo.valor = new TipoMedidorConsumo().calculoLuz(total);
    } else if (this.item.tipoMedidorConsumo.id === TipoMedidorEnum.AGUA) {
      valorConsumo.unidadeMedida = 'M³';
      valorConsumo.valor = new TipoMedidorConsumo().calculoAgua(total);
    }

    return valorConsumo;
  }

  async voltar(){
    //  Retorna para o que criou a modal
    this.md.dismiss({ 'dismissed' : true });
  }

}
