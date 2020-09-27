import { Component } from '@angular/core';
import { AvisosService } from '../shared/api/avisos.service';
import { Aviso } from './aviso';

@Component({
  selector: 'app-avisos',
  templateUrl: 'avisos.component.html',
  styleUrls: ['avisos.component.scss']
})
export class AvisoComponent {

  itens = new Array<Aviso>();

  constructor(private service: AvisosService) {
    this.service.buscar().subscribe(result => {
      console.log('Aqui', result);
    });
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
    this.itens.push(new Aviso('Manutenção do portão', 'Foi realizado a manutenção do portão e gerou um gasto de R$ X.', '03-09-2020'));
  }

}
