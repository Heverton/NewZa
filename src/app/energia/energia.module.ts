import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnergiaRoutingModule } from './energia-routing.module';
import { EnergiaComponent } from './energia.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EnergiaRoutingModule
  ],
  declarations: [EnergiaComponent]
})
export class EnergiaModule {}
