import { Component, OnInit } from '@angular/core';
import { ImovelService } from '../shared/api/imovel.service';
import { Imovel } from './imovel';

@Component({
  selector: 'app-imovel',
  templateUrl: 'imovel.component.html',
  styleUrls: ['imovel.component.scss']
})
export class ImovelComponent implements OnInit {

  itens = new Array<Imovel>();

  constructor(private service: ImovelService) {}
  // this.itens.push(new Imovel('KIT 1', 'É um ótima kit', 400.00));
  // this.itens.push(new Imovel('KIT 2', 'É um ótima kit', 600.00));

  ngOnInit(): void {
    this.service.buscarAll().subscribe(result => {
      this.itens = result;
    });
  }

}
