import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AvisoService } from 'src/app/shared/api/aviso.service';
import { Aviso } from '../aviso';

@Component({
  selector: 'app-aviso-modal',
  templateUrl: 'aviso.modal.component.html',
  styleUrls: ['aviso.modal.component.scss']
})
export class AvisoModalComponent implements OnInit {

  @Input() aviso: Aviso;
  avisoForm: FormGroup;

  constructor(private service: AvisoService, 
              private formBuilder: FormBuilder, 
              private alertController: AlertController,
              private md: ModalController) {

    this.avisoForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      dtCriacao: [Validators.required],
      dtExpiracao: [Validators.required],
    });
  }

  ngOnInit(): void {
    this.avisoForm.patchValue(this.aviso);
  }

  salvar(): void {
    this.aviso = this.avisoForm.value;
    this.service.inserir(this.aviso).subscribe(async result => {
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
    this.service.editar(this.aviso).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => { 
        alert.dismiss(); 
        this.md.dismiss();
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  excluir(): void {
    this.service.excluirId(this.aviso.id).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => { 
        alert.dismiss(); 
        this.md.dismiss();
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  voltar(): void {
    //  Retorna para o que criou a modal
    this.md.dismiss({'dismissed': true });
  }
  
}
