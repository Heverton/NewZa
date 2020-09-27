import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisoRoutingModule } from './aviso-routing.module';
import { AvisoComponent } from './aviso.component';
import { ApiModule } from '../shared/api.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvisoRoutingModule,
    ApiModule
  ],
  declarations: [AvisoComponent]
})
export class AvisoModule {}
