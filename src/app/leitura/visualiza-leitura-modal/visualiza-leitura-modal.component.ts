import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeituraService } from 'src/app/shared/api/leitura.service';
import { UsuarioLogado } from 'src/app/shared/auth/usuario-logado';
import { CalculoMedidorUtil } from '../calculo-medidor-util';
import { Leitura } from '../leitura';
import { MedidorConsumo } from '../medidor-consumo';
import { TipoMedidorEnum } from '../tipo-medidor-enum';
import { ValorMedidorConsumo } from '../valor-medidor-consumo';

@Component({
  selector: 'app-visualiza-leitura-modal',
  templateUrl: './visualiza-leitura-modal.component.html',
  styleUrls: ['visualiza-leitura-modal.component.scss']
})
export class VisualizaLeituraModalComponent implements OnInit {

  @Input() item: MedidorConsumo;
  leituras = new Array<Leitura>();
  valorConsumo = new Array<ValorMedidorConsumo>();
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador();

  constructor(private service: LeituraService, private md: ModalController) {
  }

  static realizarCalculo(leituras: Array<Leitura>): Array<ValorMedidorConsumo>{
    const valorConsumo = new Array<ValorMedidorConsumo>();

    leituras.sort((a: Leitura, b: Leitura) => {
      if (a.dataleitura > b.dataleitura) { return 1; }
      if (a.dataleitura < b.dataleitura) { return -1; }
      return 0;
    });

    let leituraAnterior: Leitura;
    let leituraAtual: Leitura;

    for (let i = 0; i < leituras.length; i++){
      if (i === 0) {
        leituraAtual = leituras[i];
        leituraAnterior = new Leitura();
        leituraAnterior.numeroleitura = 0;
        const total = leituraAtual.numeroleitura;
        valorConsumo.push(this.prepararCalculo(leituraAtual, leituraAnterior, total));
      } else {
        const j = i - 1;
        leituraAnterior = leituras[j];
        leituraAtual = leituras[i];
        const total = leituraAtual.numeroleitura - leituraAnterior.numeroleitura;
        valorConsumo.push(this.prepararCalculo(leituraAtual, leituraAnterior, total));
      }
    }

    return valorConsumo;
  }

  static prepararCalculo(leituraAtual: Leitura, leituraAnterior: Leitura, total: number): ValorMedidorConsumo {
    const valorConsumo = new ValorMedidorConsumo();

    valorConsumo.numeroAtual = leituraAtual.numeroleitura;
    valorConsumo.numeroAnterior = leituraAnterior.numeroleitura;

    valorConsumo.dataLeituraAtual = leituraAtual.dataleitura;
    valorConsumo.dataLeituraAnterir = leituraAnterior.dataleitura;

    valorConsumo.medidor = leituraAtual.medidorConsumo;
    valorConsumo.quantidade = total;

    if (leituraAtual.medidorConsumo.ValorConsumo.id === TipoMedidorEnum.LUZ) {
      valorConsumo.unidadeMedida = 'Kw';
      valorConsumo.valor = new CalculoMedidorUtil().calculoLuz(total);
    } else if (leituraAtual.medidorConsumo.ValorConsumo.id === TipoMedidorEnum.AGUA) {
      valorConsumo.unidadeMedida = 'M³';
      valorConsumo.valor = new CalculoMedidorUtil().calculoAgua(total);
    }

    return valorConsumo;
  }

  ngOnInit(): void {
    this.service.buscarIdMedidor(this.item.id).subscribe(result => {
      this.leituras = result;
      this.valorConsumo = VisualizaLeituraModalComponent.realizarCalculo(this.leituras);
    });
  }


  editar(): void {
  }

  excluir(): void {
  }


  async voltar(){
    //  Retorna para o que criou a modal
    this.md.dismiss({ 'dismissed' : true });
  }

}
