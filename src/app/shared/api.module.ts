import { NgModule } from '@angular/core';
import { AvisosService } from './api/avisos.service';
import { EnergiaService } from './api/energia.service';
import { ImovelService } from './api/imovel.service';
import { InquilinoService } from './api/inquilino.service';
import { LoginService } from './api/login.service';

@NgModule({
    imports: [ ],
    declarations: [],
    providers: [
        InquilinoService,
        AvisosService,
        EnergiaService,
        ImovelService,
        InquilinoService,
        LoginService
    ]
  })
export class ApiModule {
}
