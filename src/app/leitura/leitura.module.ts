import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeituraRoutingModule } from './leitura-routing.module';
import { LeituraComponent } from './leitura.component';
import { LeituraModalComponent } from './modal/leitura.modal.component';
import { VisualizaLeituraModalComponent } from './visualiza-leitura-modal/visualiza-leitura-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LeituraRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LeituraComponent,
    LeituraModalComponent,
    VisualizaLeituraModalComponent
  ],
  providers: [ FormBuilder ]
})
export class LeituraModule {}
