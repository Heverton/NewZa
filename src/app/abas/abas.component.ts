import { Component, OnInit } from '@angular/core';
import { AdmobService } from '../shared/api/admob.service';

@Component({
  selector: 'app-abas',
  templateUrl: 'abas.component.html',
  styleUrls: ['abas.component.scss']
})
export class AbasComponent implements OnInit {

  nomeAba: string;

  constructor(private admobService: AdmobService) { }

  ngOnInit(): void {
    this.admobService.showBanner();
  }

  coletarNome(nomeAba: string){
    this.nomeAba = nomeAba;
  }

}
