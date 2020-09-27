import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AvisosService } from './api/avisos.service';
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
        AvisosService,
        EnergiaService,
        ImovelService,
        InquilinoService,
        LoginService,
        {provide: String, useValue: ''},
    ]
  })
export class ApiModule {
}
