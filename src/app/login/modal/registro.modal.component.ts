import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/api/login.service';
import { Login } from '../login';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.modal.component.html',
  styleUrls: ['registro.modal.component.scss']
})
export class RegistroModalComponent implements OnInit {

  @Input() item: Login;
  formb: FormGroup;

  constructor(private service: LoginService, 
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private md: ModalController) {

    this.formb = this.formBuilder.group({
      id: [],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', [Validators.required, this.validarSenhas]],
    });
  }

  ngOnInit(): void {
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
    const dados = this.formb.value;
    this.item.id = dados.id;
    this.item.nome = dados.login;
  }

  // https://cursos.alura.com.br/forum/topico-validator-de-confirmar-senha-77252
  // validarSenhas = (confirmarSenha: FormControl): ValidatorFn => {
  //   console.log(confirmarSenha.value); // imprimindo o valor da confirmação de senha
  //   if (this.formb) {
  //     console.log(this.formb.value.senha); // imprimindo o vlaor da senha
  //     // if(confirmarSenha.value === this.formb.value.senha){
  //     //   return null;
  //     // } else {
  //     //   return false;
  //     // }
  //     // const isIguais = confirmarSenha.value === this.formb.value.senha;
  //     // return (isIguais) ? null : { 'A senha ': confirmarSenha.value + ' diferente de ' + this.formb.value.senha };

  //     return (control: AbstractControl): { [key: string]: any } => {
  //       debugger
  //       const isIguais = confirmarSenha.value === this.formb.value.senha;
  //       return (isIguais) ? null : { 'A senha ': confirmarSenha.value + ' diferente de ' + this.formb.value.senha };
  //     };
  //   }
  //   return null;
  // }

  validarSenhas = (confirmarSenha: FormControl): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } => {
      debugger
      const isIguais = confirmarSenha.value === control.value.senha;
      return (isIguais) ? null : { 'A senha ': confirmarSenha.value + ' diferente de ' + this.formb.value.senha };
    };
  }

}
