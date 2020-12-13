import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Inquilino } from 'src/app/inquilino/Inquilino';
import { EnergiaService } from 'src/app/shared/api/energia.service';
import { InquilinoService } from 'src/app/shared/api/inquilino.service';
import { Energia } from '../energia';

@Component({
  selector: 'app-energia',
  templateUrl: 'energia.modal.component.html',
  styleUrls: ['energia.modal.component.scss']
})
export class EnergiaModalComponent implements OnInit {

  @Input() item: Energia;
  formb: FormGroup;
  inquilinos: Inquilino[];

  constructor(private service: EnergiaService, 
              private inquiService: InquilinoService, 
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private md: ModalController) {

    this.formb = this.formBuilder.group({
      id: [],
      nomeinquilino: [''],
      numeromedidor: [''],
      numeroalterior: [0],
      numeroatual: [0],
      dataleitura: [new Date()],
    });
  }

  ngOnInit(): void {

    this.inquiService.buscarAll().subscribe(result => {
      console.log('inquilinos', result);
      this.inquilinos = result;
    });

    this.formb.patchValue(this.item);
    console.log('this.item', this.item);
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
    // this.item.nomeinquilino = this.inquilinos.find(data => data.id === Number(this.formb.value.nome)).nome;
  }

}
