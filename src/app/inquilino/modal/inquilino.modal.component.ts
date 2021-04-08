import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Imovel } from '../../imovel/imovel';
import { Login } from '../../login/login';
import { EstadoCivilService } from '../../shared/api/estadocivil.service';
import { ImovelService } from '../../shared/api/imovel.service';
import { InquilinoService } from '../../shared/api/inquilino.service';
import { UsuarioLogado } from '../../shared/auth/usuario-logado';
import { EstadoCivil } from '../estadocivil';
import { Inquilino } from '../Inquilino';

@Component({
  selector: 'app-inquilino',
  templateUrl: 'inquilino.modal.component.html',
  styleUrls: ['inquilino.modal.component.scss']
})
export class InquilinoModalComponent implements OnInit {

  @Input() item: Inquilino;
  formb: FormGroup;
  estadocivil: EstadoCivil[];
  imoveis: Imovel[];
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador(); 

  // https://ionicframework.com/docs/v3/developer-resources/forms/
  // https://www.npmjs.com/package/ngx-mask-ionic
  constructor(private service: InquilinoService, 
              private estadoCivilService: EstadoCivilService, 
              private imovelService: ImovelService, 
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private md: ModalController) {

    this.formb = this.formBuilder.group({
      id: [],
      nome: [''],
      cpf: [''],
      telefone: [''],
      sexo: [''],
      dtNascimento: [new Date()],
      // TODO dica https://www.concretepage.com/angular/angular-select-option-reactive-form
      // TODO Dica https://gist.github.com/odahcam/fe8c477eccb737b533eec0687982b340
      estadoCivil: [new EstadoCivil()],
      imovel: [new Imovel()],
      login: [new Login()],

      isPossuiFilhos: [false],
      isPossuiWhatsapp: [false],
      nomeConjuge: [''],
      sexoConjuge: [''],
      dtNascimentoConjuge: [new Date()],
    });
  }

  ngOnInit(): void {
    this.estadoCivilService.buscarAll().subscribe(result => {
      console.log('estadoCivilService', result);
      this.estadocivil = result;
    });

    if (UsuarioLogado.getUsuarioLogadoPerfilCliente()) {
      this.imovelService.buscarId(UsuarioLogado.getUsuarioLogadoId()).subscribe(result => {
        this.imoveis = result;
      });
    } else {
      this.imovelService.buscarAll().subscribe(result => {
        console.log('imovelService', result);
        this.imoveis = result;
      });
    }

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
    this.item.estadoCivil = this.estadocivil.find(data => data.id === Number(this.formb.value.estadoCivil));
    this.item.imovel = this.imoveis.find(data => data.id === Number(this.formb.value.imovel));
  }

}
