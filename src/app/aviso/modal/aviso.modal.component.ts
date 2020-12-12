import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvisoService } from 'src/app/shared/api/aviso.service';
import { Aviso } from '../aviso';

@Component({
  selector: 'app-aviso',
  templateUrl: 'aviso.modal.component.html',
  styleUrls: ['aviso.modal.component.scss']
})
export class AvisoModalComponent implements OnInit {

  @Input() aviso: Aviso;
  avisoForm: FormGroup;

  constructor(private service: AvisoService, private formBuilder: FormBuilder) {
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
    this.service.inserir(this.aviso).subscribe(result => {
      console.log('OK', result);
    }, err => {
      console.log('Erro', err);
    });
  }

  editar(): void {
    this.service.editar(this.aviso).subscribe(result => {
      console.log('OK', result);
    }, err => {
      console.log('Erro', err);
    });
  }

  excluir(): void {
    this.service.excluir(this.aviso).subscribe(result => {
      console.log('OK', result);
    }, err => {
      console.log('Erro', err);
    });
  }
}
