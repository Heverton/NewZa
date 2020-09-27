import { Component } from '@angular/core';
import { AvisoService } from '../shared/api/aviso.service';
import { Aviso } from './aviso';

@Component({
  selector: 'app-aviso',
  templateUrl: 'aviso.component.html',
  styleUrls: ['aviso.component.scss']
})
export class AvisoComponent {

  itens = new Array<Aviso>();

  constructor(private service: AvisoService) {
    this.service.buscar().subscribe(result => {
      console.log('Aqui', result);
    });
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
  }

}
