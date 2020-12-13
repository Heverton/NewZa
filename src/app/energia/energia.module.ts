import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnergiaRoutingModule } from './energia-routing.module';
import { EnergiaComponent } from './energia.component';
import { EnergiaModalComponent } from './modal/energia.modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EnergiaRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    EnergiaComponent,
    EnergiaModalComponent
  ],
  providers: [ FormBuilder ]
})
export class EnergiaModule {}
