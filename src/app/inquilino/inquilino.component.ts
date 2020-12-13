import { Component, OnInit } from '@angular/core';
import { Inquilino } from './Inquilino';
import { InquilinoService } from '../shared/api/inquilino.service';
import { ModalController } from '@ionic/angular';
import { InquilinoModalComponent } from './modal/inquilino.modal.component';

@Component({
  selector: 'app-inquilino',
  templateUrl: 'inquilino.component.html',
  styleUrls: ['inquilino.component.scss']
})
export class InquilinoComponent implements OnInit {

  itens: Array<Inquilino>;
  // TODO criar a verificação para saber se é novo adminstrador ou não
  isAdministrador = true; 

  constructor(private inquoService: InquilinoService, private md: ModalController) {}

  ngOnInit(): void {
    this.inquoService.buscarAll().subscribe(data => {
      this.itens = data;
    }, err => {
      console.log('Erro', err);
    });
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
