import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AvisoService } from './api/aviso.service';
import { EnergiaService } from './api/energia.service';
import { EstadoCivilService } from './api/estadocivil.service';
import { ImovelService } from './api/imovel.service';
import { InquilinoService } from './api/inquilino.service';
import { LoginService } from './api/login.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { RoleGuardService } from './auth/role-guard.service';
import { Interceptor } from './auth/interceptor';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { MensagemComponente } from './components/mensagem.component';
import { AdmobService } from './api/admob.service';
import { AdMobFreeBanner } from '@ionic-native/admob-free/ngx';

@NgModule({
    imports: [
      HttpClientModule,
    ],
    declarations: [
    ],
    providers: [
      AdMobFreeBanner,

      InquilinoService,
      AvisoService,
      EnergiaService,
      ImovelService,
      InquilinoService,
      LoginService,
      AuthService,
      AuthGuardService,
      RoleGuardService,
      EstadoCivilService,
      AdmobService,

      LocalNotifications,
      MensagemComponente,
      {provide: String, useValue: ''},
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
  })
export class ApiModule {
}
