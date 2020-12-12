import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvisoService } from '../shared/api/aviso.service';
import { Aviso } from './aviso';
import { AvisoModalComponent } from './modal/aviso.modal.component';

@Component({
  selector: 'app-aviso',
  templateUrl: 'aviso.component.html',
  styleUrls: ['aviso.component.scss']
})
export class AvisoComponent implements OnInit {

  itens: Aviso[] = new Array<Aviso>();

  constructor(private service: AvisoService, private modal: ModalController) {}

  ngOnInit(): void {
    this.service.buscarAll().subscribe(result => {
      this.itens = result;
    });
  }

  async ativaModal(item: Aviso) {
    const modal = await this.modal.create({
      component: AvisoModalComponent,
      cssClass: 'modal-class',
      componentProps: {aviso: item}
    });
    return await modal.present();
  }

}
