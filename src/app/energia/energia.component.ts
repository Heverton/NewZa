import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EnergiaService } from '../shared/api/energia.service';
import { UsuarioLogado } from '../shared/auth/usuario-logado';
import { Energia } from './energia';
import { EnergiaModalComponent } from './modal/energia.modal.component';

@Component({
  selector: 'app-energia',
  templateUrl: 'energia.component.html',
  styleUrls: ['energia.component.scss']
})
export class EnergiaComponent implements OnInit {

  itens = new Array<Energia>();
  fatorMultiplicador = 0.90;
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador();

  constructor(private service: EnergiaService,
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
  async ativaModal(itemmodal?: Energia): Promise<void> {
    itemmodal = (itemmodal === undefined)? new Energia() : itemmodal;
    const modal = await this.md.create({
      component: EnergiaModalComponent,
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

}
