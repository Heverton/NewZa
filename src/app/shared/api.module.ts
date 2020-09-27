import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AvisoService } from './api/aviso.service';
import { EnergiaService } from './api/energia.service';
import { ImovelService } from './api/imovel.service';
import { InquilinoService } from './api/inquilino.service';
import { LoginService } from './api/login.service';

@NgModule({
    imports: [
      HttpClientModule
    ],
    declarations: [],
    providers: [
        InquilinoService,
        AvisoService,
        EnergiaService,
        ImovelService,
        InquilinoService,
        LoginService,
        {provide: String, useValue: ''},
    ]
  })
export class ApiModule {
}
