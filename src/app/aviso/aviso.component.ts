import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvisoService } from '../shared/api/aviso.service';
import { UsuarioLogado } from '../shared/auth/usuario-logado';
import { Aviso } from './aviso';
import { AvisoModalComponent } from './modal/aviso.modal.component';

@Component({
  selector: 'app-aviso',
  templateUrl: 'aviso.component.html',
  styleUrls: ['aviso.component.scss']
})
export class AvisoComponent implements OnInit {
  
  itens: Aviso[] = new Array<Aviso>();
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador(); 

  constructor(private service: AvisoService, 
              private md: ModalController) {}

  ngOnInit(): void {
    this.service.buscarAll().subscribe(result => {
      this.itens = result;
    }, err => {
      console.log('Erro', err);
    });
  }

  async ativaModal(itemmodal?: Aviso): Promise<void> {
    itemmodal = (itemmodal === undefined)? new Aviso() : itemmodal;
    const modal = await this.md.create({
      component: AvisoModalComponent,
      cssClass: 'modal-class',
      componentProps: {aviso: itemmodal},
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
