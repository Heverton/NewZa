import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-abas',
  templateUrl: 'abas.component.html',
  styleUrls: ['abas.component.scss']
})
export class AbasComponent {

  nomeAba: string;

  constructor(private menu: MenuController) { }

  coletarNome(nomeAba: string){
    this.nomeAba = nomeAba;
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
