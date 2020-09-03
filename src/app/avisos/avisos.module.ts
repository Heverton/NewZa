import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisosRoutingModule } from './avisos-routing.module';
import { AvisosComponent } from './avisos.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvisosRoutingModule
  ],
  declarations: [AvisosComponent]
})
export class AvisosModule {}
