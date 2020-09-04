import { Component } from '@angular/core';
import { Inquilino } from './Inquilino';

@Component({
  selector: 'app-inquilino',
  templateUrl: 'inquilino.component.html',
  styleUrls: ['inquilino.component.scss']
})
export class InquilinoComponent {

  itens = new Array<Inquilino>();
  estadocivil = [{id : 1, nome: 'Solteiro'}, {id : 2, nome: 'Casado'}, {id : 3, nome: 'União instável'}];

  constructor() {
    // this.itens.push(new Inquilino('João', '', 0.00));
    // this.itens.push(new Inquilino('Pedro', '', 0.00));
  }

}
