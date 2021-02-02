import { Component, OnInit } from '@angular/core';
import { Inquilino } from './Inquilino';
import { InquilinoService } from '../shared/api/inquilino.service';
import { ModalController } from '@ionic/angular';
import { InquilinoModalComponent } from './modal/inquilino.modal.component';
import { UsuarioLogado } from '../shared/auth/usuario-logado';

@Component({
  selector: 'app-inquilino',
  templateUrl: 'inquilino.component.html',
  styleUrls: ['inquilino.component.scss']
})
export class InquilinoComponent implements OnInit {

  itens: Array<Inquilino>;
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador(); 

  constructor(private inquoService: InquilinoService, private md: ModalController) {}

  ngOnInit(): void {
    if (UsuarioLogado.getUsuarioLogadoPerfilCliente()) {
      this.inquoService.buscarId(UsuarioLogado.getUsuarioLogadoId()).subscribe(result => {
        this.itens = result;
      });
    } else {
      this.inquoService.buscarAll().subscribe(result => {
        this.itens = result;
      });
    }
  }

  async ativaModal(itemmodal?: Inquilino): Promise<void> {
    itemmodal = (itemmodal == null)? new Inquilino() : itemmodal;
    const modal = await this.md.create({
      component: InquilinoModalComponent,
      cssClass: 'modal-class',
      componentProps: {item: itemmodal}
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
