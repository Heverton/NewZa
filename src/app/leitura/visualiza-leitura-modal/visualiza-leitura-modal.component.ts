import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { LeituraService } from 'src/app/shared/api/leitura.service';
import { UsuarioLogado } from 'src/app/shared/auth/usuario-logado';
import { Leitura } from '../leitura';
import { MedidorConsumo } from '../medidor-consumo';

@Component({
  selector: 'app-visualiza-leitura-modal',
  templateUrl: './visualiza-leitura-modal.component.html'
})
export class VisualizaLeituraModalComponent implements OnInit {

  @Input() item: MedidorConsumo;
  leituras = new Array<Leitura>();

  constructor(private service: LeituraService, private md: ModalController) {
  }

  ngOnInit(): void {
    this.service.buscarIdMedidor(this.item.id).subscribe(result => {
      this.leituras = result;
    });
  }

  async voltar(){
    //  Retorna para o que criou a modal
    this.md.dismiss({ 'dismissed': true });
  }

}
