import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AvisoService } from './api/aviso.service';
import { EnergiaService } from './api/energia.service';
import { ImovelService } from './api/imovel.service';
import { InquilinoService } from './api/inquilino.service';
import { LoginService } from './api/login.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { RoleGuardService } from './auth/role-guard.service';
import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
    imports: [
      HttpClientModule,
    ],
    declarations: [ ],
    providers: [
        InquilinoService,
        AvisoService,
        EnergiaService,
        ImovelService,
        InquilinoService,
        LoginService,
        AuthService,
        AuthGuardService,
        RoleGuardService,
        {provide: String, useValue: ''},
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
  })
export class ApiModule {
}
