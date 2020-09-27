import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisosRoutingModule } from './avisos-routing.module';
import { AvisosComponent } from './avisos.component';
import { ApiModule } from '../shared/api.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvisosRoutingModule,
    ApiModule
  ],
  declarations: [AvisosComponent]
})
export class AvisosModule {}
