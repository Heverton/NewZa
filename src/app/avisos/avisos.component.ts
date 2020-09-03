import { Component } from '@angular/core';
import { Aviso } from './aviso';

@Component({
  selector: 'app-avisos',
  templateUrl: 'avisos.component.html',
  styleUrls: ['avisos.component.scss']
})
export class AvisosComponent {

  itens = new Array<Aviso>();

  constructor() {
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
  }

}
