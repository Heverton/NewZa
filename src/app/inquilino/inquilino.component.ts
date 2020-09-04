import { Component } from '@angular/core';
import { Inquilino } from './Inquilino';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inquilino',
  templateUrl: 'inquilino.component.html',
  styleUrls: ['inquilino.component.scss']
})
export class InquilinoComponent {

  itens = new Array<Inquilino>();
  estadocivil = [{id : 1, nome: 'Solteiro'}, {id : 2, nome: 'Casado'}, {id : 3, nome: 'União instável'}];
  inquilino = new Inquilino();
  inquilinoForm: FormGroup;

  // https://ionicframework.com/docs/v3/developer-resources/forms/
  // https://www.npmjs.com/package/ngx-mask-ionic

  constructor(private formBuilder: FormBuilder) {
    this.inquilinoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      sexo: ['', Validators.required],
      dtNascimento: [''],
      estadoCivil: [''],
      isPossuiFilhos: [''],
      isPossuiWhatsapp: [''],
      nomeConjuge: [''],
      sexoConjuge: [''],
      dtNascimentoConjuge: [''],
    });

    // this.itens.push(new Inquilino('João', '', 0.00));
    // this.itens.push(new Inquilino('Pedro', '', 0.00));
  }

  manterDados() {
    console.log(this.inquilinoForm.value);
    this.inquilino = this.inquilinoForm.value;
    console.log(this.inquilino);
  }

}
