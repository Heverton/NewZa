import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvisoRoutingModule } from './aviso-routing.module';
import { AvisoComponent } from './aviso.component';
import { ApiModule } from '../shared/api.module';
import { AvisoModalComponent } from './modal/aviso.modal.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvisoRoutingModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AvisoComponent,
    AvisoModalComponent
  ],
  providers: [ FormBuilder ]
})
export class AvisoModule {}
