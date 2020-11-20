import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../shared/api/aviso.service';
import { Aviso } from './aviso';

@Component({
  selector: 'app-aviso',
  templateUrl: 'aviso.component.html',
  styleUrls: ['aviso.component.scss']
})
export class AvisoComponent implements OnInit {

  itens: Aviso[] = new Array<Aviso>();

  constructor(private service: AvisoService) {}

  ngOnInit(): void {
    this.service.buscarAll().subscribe(result => {
      this.itens = result;
    });
  }
}
