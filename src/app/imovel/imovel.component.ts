import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImovelService } from '../shared/api/imovel.service';
import { UsuarioLogado } from '../shared/auth/usuario-logado';
import { Imovel } from './imovel';
import { ImovelModalComponent } from './modal/imovel.modal.component';

@Component({
  selector: 'app-imovel',
  templateUrl: 'imovel.component.html',
  styleUrls: ['imovel.component.scss']
})
export class ImovelComponent implements OnInit {

  itens = new Array<Imovel>();
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador(); 

  constructor(private service: ImovelService, private md: ModalController) {}
  
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

  async ativaModal(itemmodal?: Imovel): Promise<void> {
    itemmodal = (itemmodal === undefined)? new Imovel() : itemmodal;
    const modal = await this.md.create({
      component: ImovelModalComponent,
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
