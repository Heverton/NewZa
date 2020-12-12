import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imovel } from 'src/app/imovel/imovel';
import { Login } from 'src/app/login/login';
import { EstadoCivilService } from 'src/app/shared/api/estadocivil.service copy';
import { InquilinoService } from 'src/app/shared/api/inquilino.service';
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

  // https://ionicframework.com/docs/v3/developer-resources/forms/
  // https://www.npmjs.com/package/ngx-mask-ionic
  constructor(private service: InquilinoService, private estadoCivilService: EstadoCivilService, private formBuilder: FormBuilder) {
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
      console.log('result', result);
      this.estadocivil = result;
    });
    this.formb.patchValue(this.item);
  }

  salvar(): void {
    this.preparDados();

    this.service.inserir(this.item).subscribe(result => {
      console.log('OK', result);
    }, err => {
      console.log('Erro', err);
    });
  }

  editar(): void {
    this.preparDados();

    this.service.editar(this.item).subscribe(result => {
      console.log('Ok', result);
    }, err => {
      console.log('Erro', err);
    });
  }

  excluir(): void {
    this.preparDados();

    this.service.excluir(this.item).subscribe(result => {
      console.log('OK', result);
    }, err => {
      console.log('Erro', err);
    });
  }

  preparDados(): void {
    this.item = this.formb.value;
    const id = this.estadocivil.find(data => data.id === Number(this.formb.value.estadoCivil));
    this.item.estadoCivil = id;
  }
}
