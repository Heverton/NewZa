import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ApiModule } from '../shared/api.module';
import { RegistroModalComponent } from './modal/registro.modal.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ApiModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, RegistroModalComponent],
  providers: [
    FormBuilder,
    GooglePlus
  ]
})
export class LoginModule {}
