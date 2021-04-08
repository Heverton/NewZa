import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Inquilino } from '../inquilino/Inquilino';
import { InquilinoService } from '../shared/api/inquilino.service';
import { UsuarioLogado } from '../shared/auth/usuario-logado';
import { MedidorConsumo } from './medidor-consumo';
import { LeituraModalComponent } from './leitura/leitura.modal.component';

@Component({
  selector: 'app-leitura',
  templateUrl: 'leitura.component.html',
  styleUrls: ['leitura.component.scss']
})
export class LeituraComponent implements OnInit {

  itens = new Array<Inquilino>();
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador();
  dataAtual = new Date();

  constructor(private service: InquilinoService,
              private md: ModalController) {}

  ngOnInit(): void {
    if (UsuarioLogado.getUsuarioLogadoPerfilCliente()) {
      this.service.buscarId(UsuarioLogado.getUsuarioLogadoId()).subscribe(result => {
        this.itens = result;
      });
    } else {
      this.service.buscarAll().subscribe(result => {
        this.itens = result;
      });
    }
  }

  async ativaModal(itemmodal: MedidorConsumo): Promise<void> {
    const modal = await this.md.create({
      component: LeituraModalComponent,
      cssClass: 'modal-class',
      componentProps: {item: itemmodal},
      swipeToClose: true,
      presentingElement: await this.md.getTop(),
    });
    // init modal
    await modal.present();
    // Retorno no close
    const dadosCloseModal = await modal.onDidDismiss();
    if (dadosCloseModal) {
      this.ngOnInit();
    }
  }

  prepararMedidor(idTipo: number): MedidorConsumo {
    let medidor = new MedidorConsumo();
    this.itens.forEach(item => {
      item.imovel.medidorConsumos.forEach(med => {
        if (med.tipoMedidorConsumo.id === idTipo) {
          medidor =  med;
        }
      });
    });
    return medidor;
  }

}
