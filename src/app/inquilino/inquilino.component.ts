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

  constructor(private inquoService: InquilinoService, private avisoModal: ModalController) {}

  ngOnInit(): void {
    this.inquoService.buscarAll().subscribe(data => {
      this.itens = data;
    }, err => {
      console.log('Erro', err);
    });
  }

  async ativaModal(itemmodal: Inquilino) {
    const modal = await this.avisoModal.create({
      component: InquilinoModalComponent,
      cssClass: 'modal-class',
      componentProps: {item: itemmodal}
    });
    return await modal.present();
  }

}
