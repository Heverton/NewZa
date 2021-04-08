import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Imovel } from '../../imovel/imovel';
import { ImovelService } from '../../shared/api/imovel.service';
import { UsuarioLogado } from '../../shared/auth/usuario-logado';

@Component({
  selector: 'app-imovel',
  templateUrl: 'imovel.modal.component.html',
  styleUrls: ['imovel.modal.component.scss']
})
export class ImovelModalComponent implements OnInit {

  @Input() item: Imovel;
  formb: FormGroup;
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador();

  constructor(private service: ImovelService,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private md: ModalController) {

    this.formb = this.formBuilder.group({
      id: [],
      nome: [''],
      descricao: [''],
      valor: [0],
      sigla: [''],
      qtdComodos: [0],
    });
  }

  ngOnInit(): void {
    this.formb.patchValue(this.item);
  }

  salvar(): void {
    this.preparDados();
    this.service.inserir(this.item).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => {
        alert.dismiss();
        //  Retorna para o que criou a modal
        this.md.dismiss({'dismissed': true });
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  editar(): void {
    this.preparDados();
    this.service.editar(this.item).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => { 
        alert.dismiss(); 
        //  Retorna para o que criou a modal
        this.md.dismiss({'dismissed': true });
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  excluir(): void {
    this.preparDados();
    this.service.excluir(this.item).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => { 
        alert.dismiss(); 
        //  Retorna para o que criou a modal
        this.md.dismiss({'dismissed': true });
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  voltar(): void {
    //  Retorna para o que criou a modal
    this.md.dismiss({'dismissed': true });
  }

  private preparDados(): void {
    this.item = this.formb.value;
  }

}
