import { Component, OnInit } from '@angular/core';
import { Inquilino } from './Inquilino';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InquilinoService } from '../shared/api/inquilino.service';
import { EstadoCivilService } from '../shared/api/estadocivil.service copy';
import { EstadoCivil } from './estadocivil';

@Component({
  selector: 'app-inquilino',
  templateUrl: 'inquilino.component.html',
  styleUrls: ['inquilino.component.scss']
})
export class InquilinoComponent implements OnInit {

  estadocivil: EstadoCivil[];

  inquilinos = [];

  inquilino = new Inquilino();
  inquilinoForm: FormGroup;

  // https://ionicframework.com/docs/v3/developer-resources/forms/
  // https://www.npmjs.com/package/ngx-mask-ionic

  constructor(private formBuilder: FormBuilder, private inquoService: InquilinoService, private estadoCivilService: EstadoCivilService) {
    this.inquilinoForm = this.formBuilder.group({
      nome: [''],
      cpf: ['', [
                  // Validators.minLength(14),
                  // Validators.maxLength(14),
                  // Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)
                ]
              ],
      telefone: [''],
      sexo: [''],
      dtNascimento: [''],
      // TODO dica https://www.concretepage.com/angular/angular-select-option-reactive-form
      // TODO Dica https://gist.github.com/odahcam/fe8c477eccb737b533eec0687982b340
      estadoCivil: [''],
      isPossuiFilhos: [''],
      isPossuiWhatsapp: [''],
      nomeConjuge: [''],
      sexoConjuge: [''],
      dtNascimentoConjuge: [''],
    });
  }

  ngOnInit(): void {
    this.estadoCivilService.buscarAll().subscribe(result => {
      this.estadocivil = result;
    });

    this.inquoService.buscarAll().subscribe(data => {
      this.inquilinos = data;
    }, err => {
      console.log('Erro', err);
    });
  }

  salvarNovoInquilino(): void {
    this.inquilino = this.inquilinoForm.value;

    const id = this.estadocivil.find(data => data.id === Number(this.inquilinoForm.value.estadoCivil));
    this.inquilino.estadoCivil = id;

    this.inquoService.inserir(this.inquilino).subscribe(result => {
      console.log('Ok', result);
    }, err => {
      console.log('Erro', err);
    });
  }

  editarNovoInquilino(): void {
    console.log(this.inquilinoForm.value);
    this.inquilino = this.inquilinoForm.value;
    const id = this.estadocivil.find(data => data.id === Number(this.inquilinoForm.value.estadoCivil));
    this.inquilino.estadoCivil = id;

    this.inquoService.buscar(this.inquilino).subscribe(result => {
      this.inquilino = result;
      console.log('Ok', result);
    }, err => {
      console.log('Erro', err);
    });

    console.log(this.inquilino);

    if (this.inquilino.id > 0){
      this.inquoService.inserir(this.inquilino).subscribe(result => {
        console.log('Ok', result);
      }, err => {
        console.log('Erro', err);
      });
    }
  }

  limparDados(): void{
    this.inquilino = new Inquilino();
  }
}
