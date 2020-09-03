import { Component } from '@angular/core';

@Component({
  selector: 'app-abas',
  templateUrl: 'abas.component.html',
  styleUrls: ['abas.component.scss']
})
export class AbasComponent {

  nomeAba: string;

  constructor() { }

  coletarNome(nomeAba: string){
    this.nomeAba = nomeAba;
  }

}
