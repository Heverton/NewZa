import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Inquilino } from 'src/app/inquilino/Inquilino';
import { InquilinoService } from 'src/app/shared/api/inquilino.service';
import { LoginService } from 'src/app/shared/api/login.service';
import { MensagemComponente } from 'src/app/shared/components/mensagem.component';
import { Login } from '../login';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.modal.component.html',
  styleUrls: ['registro.modal.component.scss']
})
export class RegistroModalComponent implements OnInit {

  @Input() item: Login;
  formb: FormGroup;

  constructor(private serviceLogin: LoginService,
              private serviceInqui: InquilinoService,
              private formBuilder: FormBuilder,
              private mensagem: MensagemComponente,
              private md: ModalController) {

    this.formb = this.formBuilder.group({
      id: [],
      cpf: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', [Validators.required, this.validarSenhas]],
    });
  }

  ngOnInit(): void {
    this.formb.patchValue(this.item);
  }

  salvar(): void {
    const dados = this.formb.value;
    console.log('Criar regra de validação', this.formb.valid);

    //TODO https://www.youtube.com/watch?v=mlGehHg4oSA&ab_channel=SimonGrimm
    // https://forum.ionicframework.com/t/ionic-4-create-pdf/153975/5

    if (this.formb.valid) {
      this.serviceInqui.buscarPorParamCpf(dados.cpf).subscribe(result1 => {
        result1.login.senha = dados.senha;
        this.serviceLogin.editar(result1.login).subscribe(result => {
          this.mensagem.presentToastSucess('Sucesso: Alterado com sucesso.', result);
          this.close();
        }, err => {
          this.mensagem.presentToast('Erro: ' + err, err);
          this.close();
        });
      }, err => {
        this.mensagem.presentToast('Erro: ' + err, err);
        this.close();
      });
    }
  }

  voltar(): void {
    //  Retorna para o que criou a modal
    this.close(0);
  }

  private close(count?: number){
    if (count) {
      count = 1200;
    }
    setTimeout(() => {
      //  Retorna para o que criou a modal
      this.md.dismiss({'dismissed': true });
    }, count);
  }

  private validarSenhas = (confirmarSenha: FormControl): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } => {
      const isIguais = confirmarSenha.value === control.value.senha;
      return (isIguais) ? null : { 'A senha ': confirmarSenha.value + ' diferente de ' + this.formb.value.senha };
    };
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

}
