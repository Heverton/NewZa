import { Component } from '@angular/core';
import { Imovel } from './imovel';

@Component({
  selector: 'app-imovel',
  templateUrl: 'imovel.component.html',
  styleUrls: ['imovel.component.scss']
})
export class ImovelComponent {

  itens = new Array<Imovel>();

  constructor() {
    this.itens.push(new Imovel('KIT 1', 'É um ótima kit', 400.00));
    this.itens.push(new Imovel('KIT 2', 'É um ótima kit', 600.00));
  }

}
